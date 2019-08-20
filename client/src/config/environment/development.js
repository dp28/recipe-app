export function buildConfig() {
  return {
    apiURL:
      "https://eswdqlh7cj.execute-api.us-east-1.amazonaws.com/development/graphql",
    environment: "DEVELOPMENT",
    loggingEnabled: true,
    faviconPaths: ["/favicon-dev-32x32.ico", "/favicon-dev-16x16.ico"]
  };
}
