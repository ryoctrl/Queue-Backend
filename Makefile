.PHONY: db-migrate db-init

CONTAINER_NAME = queue-api



db-migrate:
	docker-compose exec $(CONTAINER_NAME) node_modules/.bin/sequelize db:migrate

db-create:
	docker-compose exec $(CONTAINER_NAME) node_modules/.bin/sequelize db:create

db-init: db-create db-migrate

