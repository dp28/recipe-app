import { all } from "redux-saga/effects";
import { rootSaga } from "./rootSaga";
import { watchApiMetadataRequested } from "./apiMetadata";
import { watchImportIngredients } from "./importIngredients";
import { watchImportMethod } from "./importMethod";

describe("rootSaga", () => {
  it(`should delegate to watchApiMetadataRequested and watchImportIngredients`, () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(
      all([
        watchApiMetadataRequested(),
        watchImportIngredients(),
        watchImportMethod()
      ])
    );
  });
});
