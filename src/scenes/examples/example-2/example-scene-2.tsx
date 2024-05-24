import { _props } from "@/config";
import { createGrid } from "@/util/grid";
import { makeScene2D } from "@motion-canvas/2d";
import { waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  _props("scene", view);
  yield* createGrid(view);
  yield* waitUntil("end");
});
