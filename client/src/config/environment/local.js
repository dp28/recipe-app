export function buildConfig() {
  return {
    apiURL: "http://localhost:3000/graphql",
    environment: "LOCAL",
    loggingEnabled: true,
    faviconPaths: ["/favicon-dev-32x32.ico", "/favicon-dev-16x16.ico"]
  };
}
