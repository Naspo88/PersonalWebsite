output "site_url" {
  description = "Public address of the site."
  value       = "https://${var.domain_name}"
}

output "site_bucket_name" {
  description = "Bucket the built site is synced into."
  value       = module.static_site.bucket_name
}

output "distribution_id" {
  description = "Distribution to invalidate after a deploy."
  value       = module.static_site.distribution_id
}

output "distribution_domain_name" {
  description = "CloudFront domain, usable before DNS propagates."
  value       = module.static_site.distribution_domain_name
}

output "deploy_role_arn" {
  description = "Set as the AWS_DEPLOY_ROLE_ARN variable in GitHub Actions."
  value       = module.github_oidc.deploy_role_arn
}

output "contact_function_name" {
  description = "Lambda function name, for tailing contact form logs."
  value       = module.contact_api.function_name
}

output "athena_workgroup" {
  description = "Workgroup to select in the Athena console."
  value       = module.analytics.athena_workgroup
}
