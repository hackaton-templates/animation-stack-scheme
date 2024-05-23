import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example-scene-1?scene";
import "./global.css";

export default makeProject({
  scenes: [example],
});
