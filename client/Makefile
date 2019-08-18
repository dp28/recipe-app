.PHONY: install clean test lint start build deploy

ENVIRONMENT ?= local

install: node_modules

clean:
	rm -rf node_modules build

test: node_modules
	REACT_APP_ENVIRONMENT=test npm test

lint: node_modules
	npx prettier --check "src/**/*.js"

start: node_modules
	REACT_APP_ENVIRONMENT=$(ENVIRONMENT) PORT=3001 HTTPS=true npm start

build: node_modules
	REACT_APP_ENVIRONMENT=$(ENVIRONMENT) npm run build

deploy: build
	aws s3 sync build/ s3://recipes.djpdev.com

node_modules: package.json
	npm install
	touch node_modules
