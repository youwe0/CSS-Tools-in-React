import { useState, useRef, useEffect } from 'react';

const ColorPicker = () => {
  const [imageSrc, setImageSrc] = useState('/src/assets/default image.jpg');
  const [showResult, setShowResult] = useState(false);
  const [hexValue, setHexValue] = useState('');
  const [rgbValue, setRgbValue] = useState('');
  const eyeDropperRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if ('EyeDropper' in window) {
      eyeDropperRef.current = new EyeDropper();
    } else {
      alert("Your browser doesn't support Eyedropper API!");
    }
  }, []);

  const pickColor = async () => {
    if (!eyeDropperRef.current) {
      alert("EyeDropper not initialized!");
      return;
    }

    try {
      const colorValue = await eyeDropperRef.current.open();
      const hex = colorValue.sRGBHex.toLowerCase();
      setHexValue(hex);
      setRgbValue(hexToRgb(hex));
      setShowResult(true);
    } catch (err) {
      console.error("Error picking color:", err);
      alert("Failed to pick color!");
    }
  };

  const handleFileChange = (event) => {
    setShowResult(false);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (id) => {
    const textElement = document.getElementById(id);
    textElement.select();
    // document.execCommand("copy");
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="container bg-[#E3FEF7] w-[420px] h-[550px] p-8 rounded-lg">
      <div className="img-section">
        <img
          ref={imageRef}
          src={imageSrc}
          className="w-[350px] h-[350px] object-cover mb-6 rounded border-2 border-[#27272a] block"
          alt="Color picker source"
        />
      </div>
      <div className="btns-container flex gap-3.5">
        <input
          ref={fileInputRef}
          type="file"
          id="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className="h-10 block text-xs bg-[#075985] text-white text-center p-2 rounded cursor-pointer flex-1"
        >
          Open a Photo
        </label>
        <button
          id="pick-btn"
          className="h-10 block text-xs bg-[#075985] text-white text-center p-2 rounded cursor-pointer flex-1"
          onClick={pickColor}
        >
          Pick Color
        </button>
      </div>
      <div
        id="result"
        className={`mt-5 grid grid-cols-2 gap-3.5 mx-5 ${showResult ? '' : 'hidden'}`}
      >
        <div className="relative flex items-center justify-between">
          <input
            type="text"
            id="hex-input"
            readOnly
            className="bg-transparent text-xs p-1.5 border border-[#075985] w-full rounded"
            value={hexValue}
          />
          <button
            className="absolute right-0.5 bg-transparent text-[#075985]"
            onClick={() => copyToClipboard('hex-input')}
          >
            <i className="far fa-copy"></i>
          </button>
        </div>
        <div className="relative flex items-center justify-between">
          <input
            type="text"
            id="rgb-input"
            readOnly
            className="bg-transparent text-xs p-1.5 border border-[#075985] w-full rounded"
            value={rgbValue}
          />
          <button
            className="absolute right-0.5 bg-transparent text-[#075985]"
            onClick={() => copyToClipboard('rgb-input')}
          >
            <i className="far fa-copy"></i>
          </button>
        </div>
        <div
          id="picked-color"
          className="col-span-2 rounded border border-[#27272a]"
          style={{ backgroundColor: hexValue }}
        ></div>
      </div>
    </div>
  );
};

export default ColorPicker;