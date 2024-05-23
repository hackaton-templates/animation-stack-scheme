import { Txt, TxtProps } from "@motion-canvas/2d";
import { _props } from "@/config";

export type SchemaLegendTextProps = TxtProps & {
  variant?: "header" | "subheader" | "text";
};

export default class SchemaLegendText extends Txt {
  constructor(props: SchemaLegendTextProps) {
    super(props);

    const variant = props.variant || "text";
    _props(`legend.legend-text.${variant}`, this);
  }
}
