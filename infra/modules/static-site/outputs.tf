output "bucket_name" {
  description = "Bucket the built site is synced into."
  value       = aws_s3_bucket.site.id
}

output "bucket_arn" {
  description = "Bucket ARN, used to scope the CI deploy role."
  value       = aws_s3_bucket.site.arn
}

output "distribution_id" {
  description = "Distribution to invalidate after a deploy."
  value       = aws_cloudfront_distribution.site.id
}

output "distribution_arn" {
  description = "Distribution ARN, used to scope the CI deploy role."
  value       = aws_cloudfront_distribution.site.arn
}

output "distribution_domain_name" {
  description = "CloudFront domain, useful before DNS has propagated."
  value       = aws_cloudfront_distribution.site.domain_name
}
