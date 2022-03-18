import "./styles/main.pcss";
import slider from "./scripts/slider.js"
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
  // // require("file-loader!./registration.pug");
}


window.onload = function() {
  // setTimeout(()=>{
  // }, 3000)
}
slider()
