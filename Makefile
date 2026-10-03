BASE_PATH=$(PWD)
COMPOSE_FILE=./services/docker-compose.yml

NAME=box-office-quiz-development
NAME_staging=box-office-quiz-staging

all: 
	@echo 
	@echo "please specify the command 👊"
	@echo

encrypt-envs:
	@echo "🚀 Encrypting ENVS 🚀"
	@chmod +x ./scripts/encrypt-envs.sh
	@./scripts/encrypt-envs.sh .env.development $(PASSPHRASE_DEVELOPMENT) development
	@./scripts/encrypt-envs.sh .env.staging $(PASSPHRASE_STAGING) staging
	@./scripts/encrypt-envs.sh .env.production $(PASSPHRASE_PRODUCTION) production

decrypt-envs:
	@echo "🚀 Decrypting ENVS 🚀"
	@chmod +x ./scripts/decrypt-envs.sh
	@./scripts/decrypt-envs.sh .env.development $(PASSPHRASE_DEVELOPMENT) development
	@./scripts/decrypt-envs.sh .env.staging $(PASSPHRASE_STAGING) staging
	@./scripts/decrypt-envs.sh .env.production $(PASSPHRASE_PRODUCTION) production

create-env-stage:
	@echo
	@echo "🚀Moving secrets of $(stage) to .env"
	@echo
	@chmod +x ./scripts/create-env.sh
	@./scripts/create-env.sh "$(PWD)" "$(stage)"

