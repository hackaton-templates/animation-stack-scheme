import { Txt, TxtProps } from "@motion-canvas/2d";

export default class SchemaNodeHeader extends Txt {
  constructor(props?: TxtProps) {
    super({
      ...props,
      fontFamily: "Montserrat",
      fontSize: 24,
      fontWeight: 400,
      fontStyle: "italic",
      textAlign: "center",
    });
  }
}
