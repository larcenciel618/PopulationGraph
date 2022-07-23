import React from "react";
import "./App.css";
import Headline from "./Headline/Headline";
import GetPrefsList from "./Graph/GetPrefsList";

function App() {
  return (
    <div className="App">
      <Headline title="都道府県人口推移グラフ" />
      <GetPrefsList />
    </div>
  );
}

export default App;
