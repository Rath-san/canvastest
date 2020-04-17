import Concrete from 'concretejs';
import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas.draw';

import Controls from './components/Controls';
import { Tools, Tool, ToolNumeric } from './models/tools';

interface CanvasControls {
  color: string;
  size: number;
  text?: any;
}

interface IState {
  activeTool: ToolNumeric
}

function App() {

  const initialState: IState = {
    activeTool: 1
  }

  const [state, setState] = useState(initialState)

  const setActiveTool = (activeTool: ToolNumeric) => {
      setState(prevState => ({...prevState, activeTool}))
  }

  return (
    <div className="App" onDragOver={(e) => e.preventDefault()}>
      <Canvas activeTool={state.activeTool}/>
      <Controls onToolChoose={setActiveTool}/>
    </div>
  );
}

export default App;
