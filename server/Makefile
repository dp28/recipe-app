.PHONY: install clean test lint start deploy mongo drop_mongo

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
	echo "Using CI-provided mongo database"
else
	docker-compose up -d mongo
endif

drop_mongo:
	docker-compose down

lint: node_modules
	npx prettier --check "src/**/*.js"

start: node_modules developmentSSL mongo
	npx nodemon --exec "npx serverless offline start --stage $(ENVIRONMENT) --httpsProtocol developmentSSL" -e "js yml json"

deploy: node_modules
	./bin/deploy

node_modules: package.json
	npm install
	touch node_modules

developmentSSL:
	echo "Generating self-signed certificates to enable HTTPS"
	mkdir -p developmentSSL
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout developmentSSL/key.pem -out developmentSSL/cert.pem
