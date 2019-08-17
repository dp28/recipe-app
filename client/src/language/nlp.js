import nlp from "compromise";

export const parse = nlp;

export function tag(type) {
  return `#${type}`;
}

export function loadPlugin(compromisePlugin) {
  nlp.plugin(compromisePlugin);
}
