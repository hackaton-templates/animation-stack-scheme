import SchemaNode from "@/components/schema-node";
import SchemaNodeHeader from "@/components/schema-node-header";
import { _props } from "@/config";
import { createGrid } from "@/util/grid";
import { Img, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  createRefMap,
  loop,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import SchemaLine from "@components/schema-line";

import goIcon from "@assets/images/logos/go.png";
import pythonIcon from "@assets/images/logos/python.png";
import postgresIcon from "@assets/images/logos/postgres.png";
import redisIcon from "@assets/images/logos/redis.png";
import gigaIcon from "@assets/images/logos/gigachat.png";
import reactIcon from "@assets/images/logos/react.png";
import nginxIcon from "@assets/images/logos/nginx.png";
import flutterIcon from "@assets/images/logos/flutter.png";
import s3Icon from "@assets/images/logos/s3.png";

export default makeScene2D(function* (view) {
  _props("scene", view);
  yield* createGrid(view);

  const services = createRefMap<SchemaNode>();
  const lines = createRefMap<SchemaLine>();

  view.add(
    <SchemaNode ref={services.service1} stack>
      <Img src={goIcon} width={64} height={64} />
      <SchemaNodeHeader text="Service 1" />
    </SchemaNode>
  );
  yield* services.service1().animate();

  view.add(
    <SchemaNode ref={services.service2} stack>
      <Img src={goIcon} width={64} height={64} />
      <SchemaNodeHeader text="Service 2" />
    </SchemaNode>
  );
  yield* all(
    services.service1().position([-240, -240], 1),
    waitFor(0.7, services.service2().animate())
  );

  view.add(
    <SchemaNode ref={services.service3} stack>
      <Img src={pythonIcon} width={64} height={64} />
      <SchemaNodeHeader text="Service 3" />
    </SchemaNode>
  );
  yield* all(
    services.service2().position([0, -240], 1),
    waitFor(0.7, services.service3().animate())
  );
  yield* services.service3().position([240, -240], 1);
  yield* waitUntil("services");

  view.add(
    <SchemaNode ref={services.gateway} stack>
      <Img src={goIcon} width={64} height={64} />
      <SchemaNodeHeader text="Gateway" />
    </SchemaNode>
  );
  view.add(
    <SchemaLine
      ref={lines.gateway_1}
      nodes={[services.gateway(), services.service1()]}
      circles
    />
  );
  view.add(
    <SchemaLine
      ref={lines.gateway_2}
      nodes={[services.gateway(), services.service2()]}
      circles
    />
  );
  view.add(
    <SchemaLine
      ref={lines.gateway_3}
      nodes={[services.gateway(), services.service3()]}
      circles
    />
  );
  yield* all(
    services.gateway().animate(),
    waitFor(
      0.5,
      all(
        lines.gateway_1().animate(),
        lines.gateway_2().animate(),
        lines.gateway_3().animate()
      )
    )
  );
  yield loop(() =>
    all(
      lines.gateway_1().animateCircles(),
      lines.gateway_2().animateCircles(),
      lines.gateway_3().animateCircles()
    )
  );
  yield* waitUntil("gateway");

  yield* all(
    services.gateway().animateStack(),
    services.service1().animateStack(),
    services.service2().animateStack(),
    services.service3().animateStack()
  );

  yield* waitUntil("stack");

  view.add(
    <SchemaNode ref={services.postgres1} x={-120} y={-420}>
      <Img src={postgresIcon} width={64} height={64} />
      <SchemaNodeHeader text="Database" />
    </SchemaNode>
  );
  view.add(
    <SchemaNode ref={services.redis1} x={240} y={-420}>
      <Img src={redisIcon} width={64} height={64} />
      <SchemaNodeHeader text="Cache" />
    </SchemaNode>
  );
  view.add(
    <SchemaNode ref={services.gpt1} x={480} y={-240} nodeType="api">
      <Img src={gigaIcon} width={64} height={64} />
      <SchemaNodeHeader text={"GigaChat\nAPI"} />
    </SchemaNode>
  );
  view.add(
    <SchemaLine
      ref={lines.redis_1}
      nodes={[services.service3(), services.redis1()]}
      circles
    />
  );
  view.add(
    <SchemaLine
      ref={lines.postgres_1}
      nodes={[services.service1(), services.postgres1(), services.service2()]}
      circles
    />
  );
  view.add(
    <SchemaLine
      ref={lines.giga_1}
      nodes={[services.service3(), services.gpt1()]}
      circles
    />
  );
  yield* all(
    services.postgres1().animate(),
    services.redis1().animate(),
    services.gpt1().animate(),
    waitFor(
      0.5,
      all(
        lines.postgres_1().animate(),
        lines.redis_1().animate(),
        lines.giga_1().animate()
      )
    )
  );
  yield loop(() =>
    all(
      lines.postgres_1().animateCircles(),
      lines.redis_1().animateCircles(),
      lines.giga_1().animateCircles()
    )
  );
  yield* waitUntil("databases");

  view.add(
    <SchemaNode ref={services.nginx} x={-240} y={0}>
      <Img src={nginxIcon} width={64} height={64} />
      <SchemaNodeHeader text={"Reverse\nProxy"} />
    </SchemaNode>
  );
  view.add(
    <SchemaNode ref={services.web} x={-480} y={0}>
      <Img src={reactIcon} width={64} height={64} />
      <SchemaNodeHeader text="Web" />
    </SchemaNode>
  );
  view.add(
    <SchemaNode ref={services.mobile} x={-480} y={0}>
      <Img src={flutterIcon} width={64} height={64} />
      <SchemaNodeHeader text="Mobile" />
    </SchemaNode>
  );
  view.add(
    <SchemaLine
      ref={lines.nginx}
      nodes={[services.nginx(), services.gateway()]}
      circles
    />
  );
  view.add(
    <SchemaLine
      ref={lines.web}
      nodes={[services.web(), services.nginx()]}
      circles
    />
  );
  view.add(
    <SchemaLine
      ref={lines.mobile}
      nodes={[services.mobile(), services.nginx()]}
      circles
    />
  );

  yield* all(
    services.nginx().animate(),
    waitFor(0.5, services.web().animate()),
    waitFor(0.5, lines.nginx().animate())
  );
  yield* all(
    waitFor(0.5, lines.mobile().animate()),
    waitFor(0.5, lines.web().animate()),
    services.web().y(-120, 1),
    services.mobile().animate(),
    services.mobile().y(120, 1)
  );
  yield loop(() =>
    all(
      lines.mobile().animateCircles(),
      lines.web().animateCircles(),
      lines.nginx().animateCircles()
    )
  );

  view.add(
    <SchemaNode ref={services.s3} x={-240} y={240}>
      <Img src={s3Icon} width={64} height={64} />
      <SchemaNodeHeader text="S3" />
    </SchemaNode>
  );
  view.add(
    <SchemaLine
      ref={lines.s3}
      nodes={[services.nginx(), services.s3()]}
      circles
    />
  );
  yield* all(services.s3().animate(), waitFor(0.5, lines.s3().animate()));
  yield loop(() => all(lines.s3().animateCircles()));

  yield* waitUntil("end");
});
