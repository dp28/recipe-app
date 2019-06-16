.PHONY: install clean test lint start build deploy

install: node_modules

clean:
	rm -rf node_modules build

test: node_modules
	npm test

lint: node_modules
	npx prettier --check "src/**/*.js"

start: node_modules
	PORT=3001 npm start

build: node_modules
	npm run build

deploy: build
	aws s3 sync build/ s3://prod-recipe-app-client

node_modules: package.json
	npm install
	touch node_modules
