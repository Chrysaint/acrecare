
start:
	@cd docker && docker-compose up -d

down:
	@cd docker && docker-compose down

build:
	@make down && cd docker && docker-compose up --build -d

restart:
	@cd docker && docker-compose down && docker-compose up -d