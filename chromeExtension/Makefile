.PHONY: install clean test lint start build deploy

ENVIRONMENT ?= local

install: node_modules

clean:
	rm -rf node_modules build

test: node_modules
ifdef CI
	npx jest
else
	npm test
endif

lint: node_modules
	npx prettier --check "src/**/*.js"

deploy: build
	echo "Not implemented"

node_modules: package.json
	npm install
	touch node_modules
