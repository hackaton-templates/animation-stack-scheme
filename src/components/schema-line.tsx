import { Line, LineProps } from "@motion-canvas/2d";
import {
  ReferenceArray,
  Vector2,
  createDeferredEffect,
} from "@motion-canvas/core";
import SchemaNode from "./schema-node";

type SchemaLineProps = LineProps & {
  nodes: ReferenceArray<SchemaNode>;
  instant?: boolean;
  straight?: boolean;
};

export default class SchemaLine extends Line {
  constructor(props: SchemaLineProps) {
    super({
      ...props,
      points: [],
      stroke: "#000",
      lineWidth: 4,
      zIndex: -1,
      end: props.instant ? 1 : 0,
    });

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
