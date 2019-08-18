# Upscale

A GraphQL service for parsing recipe websites.

## Development

### Installation

```bash
make install
```

### Tests

```bash
make test
```

This will run a test watcher, defaulting to running tests on everything that has
changed since the last commit.

### Linting

```bash
make lint
```

This runs `prettier`. It shouldn't be necessary locally as you should set up
your editor to automatically run `prettier` on every file save action.

### Running locally

```bash
make start
```

This runs `serverless-offline` and will launch GraphQL playground at
http://localhost:3000/graphql. The server will automatically restart if any
changes to code are detected.

### Deployment

Deploy to AWS using

```bash
make deploy
```

### Debugging AWS deployments

The logs can be tailed using

```bash
./bin/view_logs
```

For further debugging, use `serverless` directly:

```bash
npx serverless [command] [options]
```
