import { makeProject } from "@motion-canvas/core";

import example from "./scenes/examples/example-2/example-scene-2?scene";
import "@assets/css/global.css";

export default makeProject({
  scenes: [example],
});
