.PHONY: build, run, clean
build:
	cd src/frontend && npm run build
	mv src/frontend/build/ src/backend/src/static/
run:
	docker-compose build -rm && docker-compose up
clean:
	docker-compose rm
	rm -rf src/frontend/build
	rm -rf src/backend/src/static