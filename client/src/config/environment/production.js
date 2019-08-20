export function buildConfig() {
  return {
    apiURL:
      "https://1d0d1cptd8.execute-api.us-east-1.amazonaws.com/production/graphql",
    environment: "PRODUCTION",
    loggingEnabled: true,
    faviconPaths: ["/favicon-32x32.png", "/favicon-16x16.png"]
  };
}
