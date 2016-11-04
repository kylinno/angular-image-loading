NPM=./node_modules/.bin


compile: js

publish: bower

js:
	@echo "Minifying javascript ..."
	@$(NPM)/uglifyjs ./src/directives/angular-image-loading.js --compress --mangle --comments > ./dist/angular-image-loading.min.js


bower:
	@echo "Publishing as bower ..."
	bower register angular-image-loading https://github.com/kylinno/angular-image-loading.git
