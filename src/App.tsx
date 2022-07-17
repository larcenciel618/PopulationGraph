import React from 'react';
import logo from './logo.svg';
import './App.css';
import Headline from './Headline/Headline';
import Graph from './Graph/Graph';

function App() {
  return (
    <div className="App">
		<Headline title="都道府県人口推移グラフ" />
		<Graph />
    </div>
  );
}

export default App;
