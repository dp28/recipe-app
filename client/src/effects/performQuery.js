const API_URL = "http://localhost:3000/graphql";

export async function performQuery(query) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ query })
  });
  const result = await response.json();
  return result.data;
}
