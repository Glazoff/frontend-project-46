install: #устанавливает зависимости в строгом соответствии с версиями
	npm ci

gendiff:
	node bin/gendiff.js

help:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm run test:coverage
