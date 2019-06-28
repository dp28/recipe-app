.PHONY: install clean test lint start deploy

ENVIRONMENT ?= development

install: node_modules

clean:
	rm -rf node_modules

test: node_modules
ifdef CI
	npx jest
else
	npx jest --watch --notify
endif

lint: node_modules
	npx prettier --check "src/**/*.js"

start: node_modules
	npx nodemon --exec "npx serverless offline start --stage $(ENVIRONMENT)" -e "js yml json"

deploy: node_modules
	./bin/deploy

node_modules: package.json
	npm install
	touch node_modules
