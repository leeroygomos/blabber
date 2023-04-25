import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';



function App() {

  const [data, setData] = useState("");

  useEffect(()=>{
    fetch("http://localhost:3001/testAPI")
      .then(res => res.text())
      .then(res => {setData({apiResponse:res})})
    },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
