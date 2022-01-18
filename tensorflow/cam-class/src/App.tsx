import React from 'react';
import logo from './logo.svg';
import './App.css';

import ImageClassifier from "./components/ImageClassifier"

function App() {
  return (
    <div className="App">
      <h3>웹캠을 이용한 실시간 분류</h3>
      <ImageClassifier />

    </div>
  );
}

export default App;
