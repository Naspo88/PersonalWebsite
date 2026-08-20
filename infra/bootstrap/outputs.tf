output "state_bucket_name" {
  description = "Bucket to reference in the prod stack's S3 backend block."
  value       = aws_s3_bucket.state.id
}

output "backend_config" {
  description = "Copy this into infra/envs/prod/backend.tf."
  value       = <<-EOT
    terraform {
      backend "s3" {
        bucket       = "${aws_s3_bucket.state.id}"
        key          = "prod/terraform.tfstate"
        region       = "${var.aws_region}"
        use_lockfile = true
        encrypt      = true
      }
    }
  EOT
}
