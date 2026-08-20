SHELL := /bin/bash
PROD := infra/envs/prod
SITE := site

.PHONY: help install dev build lambda bootstrap init plan apply deploy invalidate fmt test

help:
	@grep -E '^[a-z-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install site and lambda dependencies
	cd $(SITE) && npm install
	cd lambda/contact && npm install

dev: ## Run the site locally
	cd $(SITE) && npm run dev

build: ## Export the static site to site/out
	cd $(SITE) && npm run build

lambda: ## Bundle the contact form lambda
	./lambda/contact/build.sh

bootstrap: ## Create the Terraform state bucket (run once)
	cd infra/bootstrap && terraform init && terraform apply

init: ## Initialise the prod stack against the remote backend
	cd $(PROD) && terraform init -backend-config=backend.hcl

plan: lambda ## Show pending infrastructure changes
	cd $(PROD) && terraform plan

apply: lambda ## Apply infrastructure changes
	cd $(PROD) && terraform apply

test: ## Run the lambda and CloudFront function test suites
	cd lambda/contact && npm test
	cd infra/modules/static-site/functions && node --test

fmt: ## Format Terraform and lint the site
	terraform fmt -recursive infra
	cd $(SITE) && npm run lint

deploy: build ## Build, upload and invalidate
	$(eval BUCKET := $(shell cd $(PROD) && terraform output -raw site_bucket_name))
	$(eval DIST := $(shell cd $(PROD) && terraform output -raw distribution_id))
	aws s3 sync $(SITE)/out s3://$(BUCKET) \
		--delete \
		--exclude "*.html" \
		--exclude "*.txt" \
		--cache-control "public,max-age=31536000,immutable"
	aws s3 sync $(SITE)/out s3://$(BUCKET) \
		--delete \
		--exclude "*" \
		--include "*.html" \
		--include "*.txt" \
		--cache-control "public,max-age=0,must-revalidate"
	aws cloudfront create-invalidation --distribution-id $(DIST) --paths "/*"

invalidate: ## Invalidate the whole distribution
	$(eval DIST := $(shell cd $(PROD) && terraform output -raw distribution_id))
	aws cloudfront create-invalidation --distribution-id $(DIST) --paths "/*"
