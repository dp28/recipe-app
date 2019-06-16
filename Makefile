PHONY: install clean test lint start deploy

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
	@echo "Not yet implemented"

deploy: node_modules
	@echo "Not yet implemented"

node_modules: package.json
	npm install
	touch node_modules
