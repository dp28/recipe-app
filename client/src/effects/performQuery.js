import { apiURL } from "../config";

export async function performQuery(query) {
  const response = await fetch(apiURL, {
    method: "POST",
    body: JSON.stringify({ query })
  });
  const result = await response.json();
  return result.data;
}
