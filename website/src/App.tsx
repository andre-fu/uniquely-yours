import React from 'react';
import './App.css';
import { ImageComponent } from './components/displayImage';


function App() {
  const url: string = 'http://localhost:5000/generator';

  return (
      <div className="App" >
        <header className="App-header">
          <ImageComponent url={url}  />
        </header>
      </div>
  );


}


export default App;
