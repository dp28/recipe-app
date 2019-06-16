.PHONY: install clean test lint start deploy

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
	npx nodemon --exec "npx serverless offline start" -e "js yml json"

deploy: node_modules
	git rev-parse HEAD > .current_version
	npx serverless deploy

node_modules: package.json
	npm install
	touch node_modules
