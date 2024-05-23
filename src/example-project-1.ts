import { makeProject } from "@motion-canvas/core";

import example from "./scenes/examples/example-1/example-scene-1?scene";
import "./global.css";

export default makeProject({
  scenes: [example],
});
