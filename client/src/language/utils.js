import { parse } from "./nlp";

export function pluralize(noun) {
  return parse(noun)
    .nouns()
    .toPlural()
    .out();
}
