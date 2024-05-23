import { Txt, TxtProps } from "@motion-canvas/2d";

export type SchemaLegendTextProps = TxtProps & {
  variant?: "header" | "subheader" | "text";
};

const variants: Record<SchemaLegendTextProps["variant"], TxtProps> = {
  header: {
    fontSize: 32,
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  subheader: {
    fontSize: 28,
    fill: "#333333",
    fontFamily: "Montserrat",
  },
  text: {
    fontSize: 28,
    fill: "#888888",
    fontFamily: "Montserrat",
  },
};

export default class SchemaLegendText extends Txt {
  constructor(props: SchemaLegendTextProps) {
    super(props);

    const variant = props.variant || "text";
    this._setupVariant(variant);
  }

  private _setupVariant(variant: SchemaLegendTextProps["variant"]) {
    for (const [key, value] of Object.entries(variants[variant])) {
      // @ts-ignore
      this[key](value);
    }
  }
}
