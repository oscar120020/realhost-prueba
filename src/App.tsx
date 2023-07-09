import { useState } from "react";
import { HouseComponent } from "./components";

const walls = [
  {
    value: "wall1",
    name: "Front",
  },
  {
    value: "wall2",
    name: "Right",
  },
  {
    value: "wall3",
    name: "Back",
  },
  {
    value: "wall4",
    name: "Left",
  },
];

function App() {
  const [value, setValue] = useState("");

  return (
    <div className="main-container">
      <div className="controls-container">
        <h2>Resaltar pared</h2>
        <div className="walls-container">
          {walls.map((wall) => (
            <div
              key={wall.value}
              className={value === wall.value ? "wall active" : "wall"}
              onClick={() => setValue(wall.value)}
            >
              <span>{wall.name}</span>
            </div>
          ))}
        </div>
      </div>
      <HouseComponent selectedWall={value} />
    </div>
  );
}

export default App;
