import logo from "./logo.svg";
import "./App.css";

function App() {
  const data = async () => {
    await fetch("http://127.0.0.1:7070/fetchall/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  console.log(data());
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
