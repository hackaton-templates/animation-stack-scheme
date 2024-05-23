import {
  Circle,
  Line,
  LineProps,
  PossibleCanvasStyle,
} from "@motion-canvas/2d";
import {
  Vector2,
  any,
  chain,
  createDeferredEffect,
  createRefArray,
  range,
  waitFor,
} from "@motion-canvas/core";
import SchemaNode from "./schema-node";
import { _cfg, _props } from "../config";

export type SchemaLineProps = LineProps & {
  nodes: SchemaNode[];
  instant?: boolean;
  straight?: boolean;
  circles?: boolean;
  circleFill?: PossibleCanvasStyle;
  circleStroke?: PossibleCanvasStyle;
};

export default class SchemaLine extends Line {
  private circles = createRefArray<Circle>();

  constructor(props: SchemaLineProps) {
    super({
      ...props,
      points: [],
      lineWidth: 4,
      zIndex: -1,
      end: props.instant ? 1 : 0,
    });
    _props("line.base", this);

    if (props.circles) {
      this.add(
        range(props.nodes.length * 2).map((i) => (
          <Circle
            ref={this.circles}
            position={props.nodes[0].position()}
            width={24}
            height={24}
            fill={props.circleFill || _props("line.circles.fill")}
            stroke={props.circleStroke || _props("line.circles.stroke")}
            lineWidth={2}
            opacity={0}
          />
        ))
      );
    }

    createDeferredEffect(() => {
      const points = props.nodes.map((node) => node.position());

      if (props.straight) {
        const pointsExtended = this.intermediatePoints(points);
        this.points(pointsExtended);
      } else {
        this.points(points);
      }
    });
  }

  public *animate() {
    yield* this.end(1, 1);
  }

  public *animateCircles() {
    const time = 1.5;
    yield* any(
      ...this.circles.map((circle, index) => {
        return chain(
          waitFor(time * index),
          chain(
            ...this.points().map((p, i) => {
              if (i == 0) {
                return chain(circle.opacity(1, 0), circle.position(p, 0));
              }
              if (i == this.points().length - 1) {
                return chain(circle.position(p, time), circle.opacity(0, 0));
              }
              return circle.position(p, time);
            })
          )
        );
      })
    );
  }

  private intermediatePoints(points: Vector2[]) {
    const pointsNew: Vector2[] = [];

    points.forEach((point, i) => {
      if (i == 0) {
        pointsNew.push(point);
        return;
      }

      const prevPoint = pointsNew[pointsNew.length - 1];
      if (point.x != prevPoint.x && point.y != prevPoint.y) {
        const midPoint = this.getIntermediatePoint(prevPoint, point);
        pointsNew.push(midPoint);
      }
      pointsNew.push(point);
    });

    return pointsNew;
  }

  private getIntermediatePoint(pointA: Vector2, pointB: Vector2) {
    if (pointA.y > pointB.y) {
      return new Vector2(pointB.x, pointA.y);
    }
    return new Vector2(pointA.x, pointB.y);
  }
}
