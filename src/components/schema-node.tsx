import { Node, NodeProps, Rect } from "@motion-canvas/2d";
import { all, easeInOutElastic, makeRef } from "@motion-canvas/core";
import { SchemaNodeConfig } from "../config";

type SchemaNodeProps = NodeProps & {
  nodeType?: "default" | "api";
  instant?: boolean;
};

export default class SchemaNode extends Node {
  public readonly rectBase: Rect;

  constructor(props?: SchemaNodeProps) {
    super({ ...props, children: null });

    const nodeType = props?.nodeType ?? "default";
    const fill = SchemaNodeConfig.background[nodeType];
    const lineDash = [nodeType == "api" ? 10 : 0];

    this.add(
      <Rect
        ref={makeRef(this, "rectBase")}
        fill={fill}
        stroke="#000"
        lineDash={lineDash}
        lineWidth={2}
        layout
        direction="column"
        alignItems="center"
        padding={[20, 40]}
        gap={10}
        smoothCorners
        radius={8}
        opacity={props.instant ? 1 : 0}
        scale={props.instant ? 1 : 0}
      >
        {props.children}
      </Rect>
    );
  }

  public *animate() {
    yield* all(
      this.rectBase.scale(1, 0.8, easeInOutElastic),
      this.rectBase.opacity(1, 0.8)
    );
  }
}
