import React from 'react';
import './App.css';
import { ImageComponent } from './components/displayImage';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/navigation'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const url: string = 'http://localhost:5000/generator';
  
  return (
      <div className="App" style={{ backgroundColor: 'white'}}>
        <Navigation />
        <header className="App-header">
          <ImageComponent url={url}  />
        </header>
      </div>
  );


}


export default App;
