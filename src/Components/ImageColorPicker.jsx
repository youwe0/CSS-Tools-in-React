import React, { useState, useEffect } from 'react';

const GradientGenerator = () => {
  const [direction, setDirection] = useState('to left top');
  const [color1, setColor1] = useState('#5665E9');
  const [color2, setColor2] = useState('#A271F8');
  const [gradientCode, setGradientCode] = useState('');
  const [copyText, setCopyText] = useState('Copy Code');

  useEffect(() => {
    updateGradient();
  }, [direction, color1, color2]);

  const getRandomColor = () => {
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    return `#${randomHex}`;
  };

  const updateGradient = () => {
    const gradient = `linear-gradient(${direction}, ${color1}, ${color2})`;
    setGradientCode(`background: ${gradient};`);
  };

  const handleRefresh = () => {
    setColor1(getRandomColor());
    setColor2(getRandomColor());
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gradientCode);
      setCopyText('Code Copied');
      setTimeout(() => setCopyText('Copy Code'), 1600);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="w-[450px] h-[550px] p-6 bg-teal-50 rounded-lg shadow-xl">
        {/* Gradient Preview */}
        <div 
          className="w-full h-56 rounded-lg mb-5"
          style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
        ></div>
        
        {/* Controls Row */}
        <div className="flex justify-between mb-5">
          {/* Direction Selector */}
          <div className="w-[48%]">
            <p className="text-lg mb-2">Direction</p>
            <div className="rounded-md border border-gray-400 p-2">
              <select 
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="w-full border-none outline-none text-base bg-transparent"
              >
                <option value="to top">Top</option>
                <option value="to right top">Right top</option>
                <option value="to right">Right</option>
                <option value="to right bottom">Right bottom</option>
                <option value="to bottom">Bottom</option>
                <option value="to left bottom">Left bottom</option>
                <option value="to left">Left</option>
                <option value="to left top">Left top</option>
              </select>
            </div>
          </div>
          
          {/* Color Pickers */}
          <div className="w-[48%] ml-8">
            <p className="text-lg mb-2">Colors</p>
            <div className="flex">
              <input 
                type="color" 
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="h-10 w-[calc(50%-10px)]"
              />
              <input 
                type="color" 
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="h-10 w-[calc(50%-10px)] ml-1.5"
              />
            </div>
          </div>
        </div>
        
        {/* Code Output */}
        <textarea 
          className="w-full text-gray-800 text-base resize-none p-3 rounded-md border border-gray-300 mb-5"
          disabled 
          value={gradientCode}
          rows="3"
        />
        
        {/* Buttons */}
        <div className="flex justify-between">
          <button 
            onClick={handleRefresh}
            className="w-[48%] py-3.5 bg-gray-600 text-white text-lg rounded-md hover:bg-gray-700 transition-colors"
          >
            Refresh Colors
          </button>
          <button 
            onClick={handleCopy}
            className="w-[48%] py-3.5 bg-indigo-500 text-white text-lg rounded-md hover:bg-indigo-600 transition-colors"
          >
            {copyText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
