locals {
  common_tags = {
    Project   = var.project_name
    ManagedBy = "terraform"
    Stack     = "prod"
  }

  lambda_bundle_path = "${path.module}/../../../lambda/contact/contact.zip"
}

data "aws_route53_zone" "site" {
  name         = var.domain_name
  private_zone = false
}

module "analytics" {
  source = "../../modules/analytics"

  project_name = var.project_name
}

module "contact_api" {
  source = "../../modules/contact-api"

  project_name       = var.project_name
  domain_name        = var.domain_name
  hosted_zone_id     = data.aws_route53_zone.site.zone_id
  recipient_email    = var.recipient_email
  allowed_origin     = "https://${var.domain_name}"
  lambda_bundle_path = local.lambda_bundle_path
}

module "static_site" {
  source = "../../modules/static-site"

  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }

  project_name           = var.project_name
  domain_name            = var.domain_name
  hosted_zone_id         = data.aws_route53_zone.site.zone_id
  locales                = var.locales
  default_locale         = var.default_locale
  api_origin_domain      = module.contact_api.api_origin_domain
  log_bucket_domain_name = module.analytics.log_bucket_domain_name
}

module "github_oidc" {
  source = "../../modules/github-oidc"

  project_name         = var.project_name
  github_repository    = var.github_repository
  create_oidc_provider = var.create_github_oidc_provider
  site_bucket_arn      = module.static_site.bucket_arn
  distribution_arn     = module.static_site.distribution_arn
}
