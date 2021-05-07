import "./App.css";
import Welcome from "./Welcome";

function App() {
  return (
    <div className="App">
      <Welcome name="John" />
      <Welcome name="Mary" />
      <Welcome name="Alex" />
    </div>
  );
}

export default App;
