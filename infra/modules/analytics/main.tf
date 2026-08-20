data "aws_caller_identity" "current" {}

locals {
  logs_bucket_name = "${var.project_name}-logs-${data.aws_caller_identity.current.account_id}"
  log_prefix       = "cloudfront/"
  glue_database    = replace("${var.project_name}_analytics", "-", "_")
}

resource "aws_s3_bucket" "logs" {
  bucket = local.logs_bucket_name
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket = aws_s3_bucket.logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id

  rule {
    id     = "expire-access-logs"
    status = "Enabled"

    filter {
      prefix = local.log_prefix
    }

    expiration {
      days = var.log_retention_days
    }
  }

  rule {
    id     = "expire-query-results"
    status = "Enabled"

    filter {
      prefix = "athena-results/"
    }

    expiration {
      days = var.query_result_retention_days
    }
  }
}
