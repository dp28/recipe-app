.PHONY: install clean test lint start build deploy src/config/index.js manifest.json

ENVIRONMENT ?= development

install: node_modules

clean:
	rm -rf build node_modules src/config/index.js manifest.json

test: node_modules
	ENVIRONMENT=test make src/config/index.js
ifdef CI
	ENVIRONMENT=test npx jest
else
	ENVIRONMENT=test npm test
endif

lint: node_modules
	npx prettier --check "src/**/*.js"

start: src/config/index.js manifest.json

build: src/config/index.js manifest.json
	mkdir -p ./build
	zip -r ./build/upscale.zip . \
		--include "src/*" "lib/$(ENVIRONMENT)/*" "images/$(ENVIRONMENT)/*" manifest.json

deploy: build manifest.json
	echo "Not implemented"

node_modules: package.json
	npm install
	touch node_modules

src/config/index.js:
	echo "export * from \"./environment/$(ENVIRONMENT).js\"" > src/config/index.js

manifest.json: manifest.$(ENVIRONMENT).json
	cp manifest.$(ENVIRONMENT).json manifest.json
