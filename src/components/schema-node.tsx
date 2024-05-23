import { Node, NodeProps, Rect } from "@motion-canvas/2d";
import {
  ReferenceArray,
  all,
  createRefArray,
  createSignal,
  easeInOutElastic,
  easeOutElastic,
  makeRef,
} from "@motion-canvas/core";
import { SchemaNodeConfig } from "../config";

export type SchemaNodeProps = NodeProps & {
  nodeType?: "default" | "api";
  instant?: boolean;
  stack?: boolean;
};

export default class SchemaNode extends Node {
  public readonly rectBase: Rect;
  public readonly stack: ReferenceArray<Rect>;

  constructor(props?: SchemaNodeProps) {
    super({ ...props, children: null });
    this.stack = createRefArray<Rect>();

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

    if (props.stack) {
      const sizeSignal = createSignal(() => {
        return this.rectBase.size();
      });
      this.add(
        <Rect
          ref={this.stack}
          width={sizeSignal().x}
          height={sizeSignal().y}
          fill={fill}
          stroke="#000"
          lineDash={lineDash}
          lineWidth={2}
          smoothCorners
          radius={8}
          zIndex={-1}
          opacity={0}
        />
      );
      this.add(
        <Rect
          ref={this.stack}
          width={sizeSignal().x}
          height={sizeSignal().y}
          fill={fill}
          stroke="#000"
          lineDash={lineDash}
          lineWidth={2}
          smoothCorners
          radius={8}
          zIndex={-2}
          opacity={0}
        />
      );
    }
  }

  public *animate() {
    yield* all(
      this.rectBase.scale(1, 0.8, easeInOutElastic),
      this.rectBase.opacity(1, 0.8)
    );
  }

  public *animateStack() {
    yield* all(...this.stack.map((s) => s.opacity(1, 0)));
    yield* all(
      ...this.stack.map((s, i) =>
        s.position([8 * (i + 1), 8 * (i + 1)], 0.5, easeOutElastic)
      )
    );
  }
}
