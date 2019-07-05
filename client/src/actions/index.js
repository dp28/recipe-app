export const REQUEST_API_METADATA = "REQUEST_API_METADATA";
export const API_METADATA_LOADED = "API_METADATA_LOADED";
export const ERROR_LOADING_API_METADATA = "ERROR_LOADING_API_METADATA";
export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS";
export const COMBINE_INGREDIENTS = "COMBINE_INGREDIENTS";

export const requestApiMetadata = () => ({ type: REQUEST_API_METADATA });

export const apiMetadataLoaded = ({ version, environment, deployedAt }) => ({
  type: API_METADATA_LOADED,
  version,
  environment,
  deployedAt
});

export const errorLoadingApiMetadata = error => ({
  type: ERROR_LOADING_API_METADATA,
  error
});

export const updateIngredients = ({ ingredients }) => ({
  type: UPDATE_INGREDIENTS,
  ingredients
});

export const combineIngredients = ingredients => ({
  type: COMBINE_INGREDIENTS,
  ingredients
});
