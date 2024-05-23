import { Txt, type TxtProps } from "@motion-canvas/2d";
import { _props } from "@/config";

export type SchemaNodeHeaderProps = TxtProps & {};

export default class SchemaNodeHeader extends Txt {
  constructor(props?: SchemaNodeHeaderProps) {
    super({
      ...props,
      fontFamily: "Montserrat",
      fontSize: 24,
      fontWeight: 400,
      fontStyle: "italic",
      textAlign: "center",
    });
    _props(`node.node-header`, this);
  }
}
