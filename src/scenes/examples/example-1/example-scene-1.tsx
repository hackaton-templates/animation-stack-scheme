import { Img, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  createRef,
  createRefArray,
  loop,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

import SchemaLine from "@components/schema-line";
import SchemaGroup from "@components/schema-group";
import SchemaLegend from "@components/schema-legend";
import SchemaLegendText from "@components/schema-legend-text";
import SchemaNode from "@components/schema-node";
import SchemaNodeHeader from "@components/schema-node-header";
import { _props } from "@/config";
import { createGrid } from "@/util/grid";

import vueIcon from "@assets/images/logos/vue.png";
import nuxtIcon from "@assets/images/logos/nuxt.png";
import postgresIcon from "@assets/images/logos/postgres.png";
import gptIcon from "@assets/images/logos/chatgpt.png";
import pythonIcon from "@assets/images/logos/python.png";

export default makeScene2D(function* (view) {
  _props("scene", view);
  yield* createGrid(view);

  const nodes = createRefArray<SchemaNode>();
  const lines = createRefArray<SchemaLine>();

  const legend = createRef<SchemaLegend>();
  view.add(
    <SchemaLegend ref={legend} viewLocalMatrix={view.worldToLocal()}>
      <SchemaLegendText text="БухУчётКом" variant="header" />
      <SchemaLegendText text="lulz-team" variant="text" fontStyle="italic" />
    </SchemaLegend>
  );
  yield* legend().animate();

  view.add(
    <SchemaNode ref={nodes}>
      <Img src={nuxtIcon} width={64} height={64} />
      <SchemaNodeHeader>Backend</SchemaNodeHeader>
    </SchemaNode>
  );
  view.add(
    <SchemaNode ref={nodes} x={300}>
      <Img src={postgresIcon} width={64} height={64} />
      <SchemaNodeHeader>Database</SchemaNodeHeader>
    </SchemaNode>
  );
  view.add(<SchemaLine ref={lines} nodes={nodes} straight circles />);

  yield* all(
    ...nodes.map((n) => n.animate()),
    waitFor(0.2, all(...lines.map((l) => l.animate())))
  );
  yield* waitUntil("backend");

  view.add(
    <SchemaNode ref={nodes} x={-300}>
      <Img src={vueIcon} width={64} height={64} />
      <SchemaNodeHeader>Frontend</SchemaNodeHeader>
    </SchemaNode>
  );
  view.add(<SchemaLine ref={lines} nodes={nodes} straight circles />);
  yield* all(nodes[2].animate(), all(...lines.map((l) => l.animate())));
  yield* waitUntil("frontend");

  const microservices = createRef<SchemaGroup>();
  const innerNodes = createRefArray<SchemaNode>();
  const apiNode = createRef<SchemaNode>();
  view.add(
    <SchemaGroup ref={microservices} y={240} header="Microservices">
      <SchemaNode ref={innerNodes}>
        <Img src={pythonIcon} width={64} height={64} />
        <SchemaNodeHeader children={"Receipt\nRecognition"} />
      </SchemaNode>
      <SchemaNode ref={innerNodes}>
        <Img src={pythonIcon} width={64} height={64} />
        <SchemaNodeHeader children={"XLSX\nParser"} />
      </SchemaNode>
    </SchemaGroup>
  );
  view.add(
    <SchemaNode ref={apiNode} x={-420} y={240} nodeType="api">
      <Img src={gptIcon} width={64} height={64} />
      <SchemaNodeHeader>ChatGPT</SchemaNodeHeader>
    </SchemaNode>
  );
  view.add(
    <SchemaLine
      ref={lines}
      nodes={[nodes[0], microservices()]}
      straight
      circles
    />
  );
  view.add(
    <SchemaLine
      ref={lines}
      nodes={[microservices(), apiNode()]}
      straight
      circles
    />
  );

  yield* all(
    microservices().animate(),
    apiNode().animate(),
    waitFor(0.5, all(...lines.map((l) => l.animate()))),
    ...nodes.map((n) => n.y(-100, 1))
  );
  yield* all(...innerNodes.map((n) => n.animate()));

  yield loop(() => {
    return all(...lines.map((l) => l.animateCircles()));
  });

  yield* waitUntil("end");
});
