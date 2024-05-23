export const configuration = {};

export const properties = {
  scene: {
    fill: "#ffffff",
  },
  group: {
    fill: "#f0f0f0",
  },
  legend: {
    "legend-text": {
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
    },
    base: {
      fill: "#ffffff",
      stroke: "#000000",
    },
  },
  line: {
    base: {
      stroke: "#000000",
    },
    circles: {
      fill: "#999999",
      stroke: "#000000",
    },
  },
  node: {
    base: {
      default: {
        fill: "#ffffff",
        stroke: "#000000",
      },
      api: {
        fill: "#f0f0f0",
        stroke: "#000000",
        lineDash: [10],
      },
    },
    "node-header": {},
  },
  grid: {
    stroke: "#cccccc",
  },
};
