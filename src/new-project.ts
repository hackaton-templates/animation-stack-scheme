import { makeProject } from "@motion-canvas/core";

import scene from "./scenes/new-scene?scene";
import "./global.css";

export default makeProject({
  scenes: [scene],
});
