import { type Node } from "@motion-canvas/2d";
import { configuration, properties } from "./default";

function index(obj: any, i: any) {
  return obj[i];
}

export const _props = (path: string, node?: Node | undefined) => {
  const props = _cfg(path, true);
  if (node == undefined) return props;

  for (const [key, value] of Object.entries(props)) {
    try {
      // @ts-ignore
      node[key](value);
    } catch {}
  }
};

export const _cfg = (path: string, useProps: boolean = false) => {
  return path.split(".").reduce(index, useProps ? properties : configuration);
};
