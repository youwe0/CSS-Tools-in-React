import { useState } from "react";
import GradientGenerator from "./Components/GradientGenerator";
import ImageColorPicker from "./Components/ImageColorPicker";
import Sidebar from "./Components/Sidebar";

export default function App() {
  const [selected, setSelected] = useState("gradient");

  return (
    <div className="flex min-h-screen">
      <Sidebar selected={selected} setSelected={setSelected} />
      <main className="flex-1 p-4 bg-gray-500">
        {selected === "gradient" ? <ImageColorPicker />: <GradientGenerator /> }
      </main>
    </div>
   
  );
}
