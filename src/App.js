import React from 'react';
import './App.css';
import Timer from "./timeManager.js";
import Dropdown from "./dropdown.js";
import Header from "./header.js";
import Calendar from "./calendar.js";
import Lunch from "./lunch.js";
import List from "./scheduleList.js";
import ButtonBar from "./buttonBar.js";
import Job from "./Unrelated.js";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mainContent">
        <div className="lunchPage">
          <Lunch />
        </div>
      </div>
    </div>
  );
}

export default App;
