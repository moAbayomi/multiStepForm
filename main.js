import Router from "./services/Router.js";

import { Info } from "./components/Info.js";
import { AddOn } from "./components/AddOn.js";
import { Plan } from "./components/Plan.js";
import { Summary } from "./components/Summary.js";
document.addEventListener("DOMContentLoaded", () => {
  //console.log("ayayaya");
  Router.init();
});

window.app = {};
