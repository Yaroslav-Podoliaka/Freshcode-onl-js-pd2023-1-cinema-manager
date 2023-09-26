import React from "react";
import "./Main.css";
import Movies from "../Movies/Movies";
import Actors from "../Actors/Actors";
import Directors from "../Directors/Directors";
import Studios from "../Studios/Studios";
// import HomePage from '../HomePage';

function Main() {
  return (
    <div className="main-container">
      {/* <HomePage /> */}
      <Movies />
      <Actors />
      <Directors />
      <Studios />
    </div>
  );
}

export default Main;
