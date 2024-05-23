import { makeProject } from "@motion-canvas/core";

import scene from "./scenes/new-scene?scene";
import "@assets/css/global.css";

export default makeProject({
  scenes: [scene],
});
