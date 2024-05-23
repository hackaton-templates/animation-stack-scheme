export const configuration = {};

export const properties = {
  scene: {
    fill: "#242424",
  },
  group: {
    fill: "#161616",
  },
  legend: {
    "legend-text": {
      header: {
        fontSize: 32,
        fontWeight: 600,
        fontFamily: "Montserrat",
        fill: "#fcfcfc",
      },
      subheader: {
        fontSize: 28,
        fill: "#cccccc",
        fontFamily: "Montserrat",
      },
      text: {
        fontSize: 28,
        fill: "#999999",
        fontFamily: "Montserrat",
      },
    },
    base: {
      fill: "#444444",
      stroke: "#cccccc",
    },
  },
  line: {
    base: {
      stroke: "#cccccc",
    },
    circles: {
      fill: "#999999",
      stroke: "#000000",
    },
  },
  node: {
    base: {
      default: {
        fill: "#444444",
        stroke: "#cccccc",
      },
      api: {
        fill: "#181818",
        stroke: "#cccccc",
        lineDash: [10],
      },
    },
    "node-header": {
      fill: "#cccccc",
    },
  },
  grid: {
    stroke: "#6b6b6b",
  },
};
