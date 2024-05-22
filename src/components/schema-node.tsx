import { Node, NodeProps, Rect } from "@motion-canvas/2d";
import { easeInOutElastic, makeRef } from "@motion-canvas/core";
import { SceneConfig } from "../config";

export default class SchemaNode extends Node {
  public readonly rectBase: Rect;

  constructor(props?: NodeProps) {
    super({ ...props, children: null });

    this.add(
      <Rect
        ref={makeRef(this, "rectBase")}
        fill={SceneConfig.background}
        stroke="#000"
        lineWidth={2}
        layout
        direction="column"
        alignItems="center"
        padding={[20, 40]}
        gap={10}
        smoothCorners
        radius={8}
        scale={0}
      >
        {props.children}
      </Rect>
    );
  }

  public *animate() {
    yield* this.rectBase.scale(1, 0.5, easeInOutElastic);
  }
}
