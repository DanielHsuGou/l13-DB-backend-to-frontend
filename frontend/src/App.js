import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3001/");
      const data = await res.json(); // res.text()
      console.log(data);
      setItems(data);
    };
    getData();
  });

  return (
    <div className="App">
      <header className="App-header" style={{ fontSize: "22px" }}>
        {JSON.stringify(items)}
      </header>
    </div>
  );
}

export default App;
