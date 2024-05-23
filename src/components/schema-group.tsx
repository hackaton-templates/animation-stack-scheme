import { Layout } from "@motion-canvas/2d";
import SchemaNode, { type SchemaNodeProps } from "./schema-node";
import SchemaNodeHeader from "./schema-node-header";
import { _props } from "../config";

type SchemaGroupProps = SchemaNodeProps & {
  header?: string;
};

export default class SchemaGroup extends SchemaNode {
  constructor(props?: SchemaGroupProps) {
    super({ ...props, children: null });
    _props("group", this.rectBase);
    this.rectBase.gap(20);

    if (props.header) {
      this.rectBase.add(<SchemaNodeHeader>{props.header}</SchemaNodeHeader>);
    }

    this.rectBase.add(
      <Layout layout gap={10}>
        {props.children}
      </Layout>
    );
  }
}
