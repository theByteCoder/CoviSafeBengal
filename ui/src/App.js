import MapsController from "./Components/MapsController";

const containerParent = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
};

const containerChild = {
  height: "100%",
  width: "100%",
  overflow: "auto",
  paddingRight: "20px",
};

function App() {
  return (
    <div className={containerParent}>
      <div className={containerChild}>
        <MapsController />
      </div>
    </div>
  );
}

export default App;
