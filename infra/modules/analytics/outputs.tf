output "log_bucket_domain_name" {
  description = "Value for the CloudFront distribution logging_config bucket."
  value       = aws_s3_bucket.logs.bucket_domain_name
}

output "athena_workgroup" {
  description = "Workgroup to select in the Athena console."
  value       = aws_athena_workgroup.analytics.name
}

output "glue_database" {
  description = "Glue database holding the access log table."
  value       = aws_glue_catalog_database.analytics.name
}
