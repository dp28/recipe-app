# Chrome extension

Enables users to easily copy recipes from external websites into the recipe app.

## Design

This is essentially a wrapper around an `iframe` to the client application to enable the client to request data from an external website. It has several parts:

- A background script (that just enables opening the popup)
- A content script with two responsibilities:
  - To show a popup containing the `iframe` (using a content script rather than an extension's popup allows the size to be whatever it needs to be)
  - To extract data from the host page when the iframe requests it

## Development

### Running locally

**Note:** This depends on having the local client running at port `3001`.

To load the extension for the first time, run

```bash
ENVIRONMENT=development make start
```

Then load the unpacked extension (this directory) on chrome://extensions/.

Any code changes should reload the extension's code automatically from this point onward.

### Running against production

This won't autoreload as you change the code, so remember to reload the extension at chrome://extensions/.

```bash
ENVIRONMENT=production make start
```

The extension icon should be blue for the production build, as opposed to the green icons in development.

### Tests

```bash
make test
```

## Deployment

Use

```bash
ENVIRONMENT=production make build
```

to create a production-ready zipfile for uploading to the Chrome Developer Dashboard.
