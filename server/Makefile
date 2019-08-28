.PHONY: install clean test lint start deploy mongo

ENVIRONMENT ?= development

install: node_modules

clean:
	rm -rf node_modules

test: node_modules mongo
ifdef CI
	npx jest
else
	npx jest --watch --notify
endif

mongo:
ifdef CI
	echo "Not implemented"
else
	docker-compose up -d mongo
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
