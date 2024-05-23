import { Rect, type RectProps } from "@motion-canvas/2d";
import { Vector2, all, easeOutCubic } from "@motion-canvas/core";

export type SchemaLegendProps = RectProps & {
  viewLocalMatrix: DOMMatrix;
  instant?: boolean;
};

export default class SchemaLegend extends Rect {
  constructor(props: SchemaLegendProps) {
    super({
      ...props,
      layout: true,
      direction: "column",
      offset: [-1, -1],
      padding: [20, 40],
      gap: 10,
      fill: "#ffffff",
      stroke: "#000000",
      lineWidth: 2,
      scale: 0,
      opacity: 0,
      smoothCorners: true,
      radius: 8,
    });

    const world = new Vector2(60, 60);
    const local = world.transformAsPoint(props.viewLocalMatrix);
    this.topLeft(local);
  }

  public *animate() {
    yield* all(
      this.scale(1, 0.5, easeOutCubic),
      this.opacity(1, 0.5, easeOutCubic)
    );
  }
}
