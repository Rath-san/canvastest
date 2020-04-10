import React, { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas.draw.';
import Controls from './components/Controls';

interface CanvasControls {
  color: string;
  size: number;
  text?: any;
}

function App() {

  // const [canvasControls, setCanvasControls] = useState<CanvasControls>({
  //   color: 'red',
  //   size: 2,
  //   text: ''
  // });

  // const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="App">
      <Canvas />
      <Controls/>
    </div>
  );
}

export default App;
