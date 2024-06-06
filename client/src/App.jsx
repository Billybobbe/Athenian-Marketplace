import {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';

export const API = "http://127.0.0.1:8080" //"http://10.19.100.187:8080";

function App() {
  const [data, setData] = useState(null);
  useEffect(()=>{
    fetch("/api")
    .then((res)=> res.json())
    .then((data)=> setData(data.message));
  }, []);

  return(
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
