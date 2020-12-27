import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Path from 'path';
import Fs from 'fs';
import { ImageComponent } from './components/displayImage';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';


function App() {
  const url: string = 'http://localhost:5000/generator';

  return (
    // style={{ backgroundImage: `url(https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(20).jpg)`}}
    <Router>
      <div>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/foo">Foo</Link>
            <Link to="/bar">Bar</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/foo" component={Foo} />
            <Route exact path="/bar" component={Bar} />
          </Switch>
        </div>
      </div>
      <div className="App" >
        <header className="App-header">
          <ImageComponent url={url}  />
        </header>
      </div>
    </Router>
  );


}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       photos: []
//     };  
//   }

//   componentDidMount() {
//    fetch('http://localhos:5000').then(response => {
//      if (!response.ok){
//        throw Error("Error");
//      }
//      return response.json()
//      .then(allData => {
//        this.setState({ photos: allData});
//      })
//    })
//   }

//   render () {
//     return (
//       <section className="app">
//         <p>Working</p>
//       </section>
//     )
//   }
// // }

// async function donwnloadImage(){
//   const url ='http://localhost:5000/generator';
//   const path = Path.resolve(__dirname, './fakeimg.jpg');
//   // const writer = Fs.createWriteStream(path);

//   const response = await Axios({
//     url,
//     method: 'GET',
//     responseType: 'stream'
//   })
//   response.data.pipe(writer);

//   return response
// }

export default App;
