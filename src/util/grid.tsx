import { type Node, Grid } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitUntil } from "@motion-canvas/core";
import { _props } from "@/config";

export function* createGrid(parent: Node) {
  const grid = createRef<Grid>();

  parent.add(
    <Grid
      ref={grid}
      width={"100%"}
      height={"100%"}
      spacing={60}
      start={0.5}
      end={0.5}
      opacity={0.5}
    />
  );
  _props("grid", grid());

  yield* all(
    grid().opacity(1, 1, easeInOutCubic),
    grid().start(1, 0.8, easeInOutCubic),
    grid().end(0, 0.8, easeInOutCubic)
  );
  yield* waitUntil("start");
  return grid;
}
