// Using a dynamic import enables static imports in the rest of the app
(async () => {
  const src = chrome.extension.getURL("src/contentScript.js");
  try {
    const contentScript = await import(src);
    contentScript.main();
  } catch (error) {
    console.error(error);
  }
})();
