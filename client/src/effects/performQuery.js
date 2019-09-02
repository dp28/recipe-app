import { apiURL } from "../config";

export async function performQuery(query, variables = {}) {
  const response = await fetch(apiURL, {
    method: "POST",
    body: JSON.stringify({ query, variables })
  });
  const result = await response.json();
  return result.data;
}
