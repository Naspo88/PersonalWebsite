resource "aws_glue_catalog_database" "analytics" {
  name        = local.glue_database
  description = "CloudFront access logs for ${var.project_name}."
}

resource "aws_glue_catalog_table" "access_logs" {
  name          = "cloudfront_access_logs"
  database_name = aws_glue_catalog_database.analytics.name
  table_type    = "EXTERNAL_TABLE"

  parameters = {
    "skip.header.line.count" = "2"
    EXTERNAL                 = "TRUE"
  }

  storage_descriptor {
    location      = "s3://${aws_s3_bucket.logs.id}/${local.log_prefix}"
    input_format  = "org.apache.hadoop.mapred.TextInputFormat"
    output_format = "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat"

    ser_de_info {
      serialization_library = "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe"

      parameters = {
        "field.delim"          = "\t"
        "serialization.format" = "\t"
      }
    }

    dynamic "columns" {
      for_each = local.access_log_columns

      content {
        name = columns.value.name
        type = columns.value.type
      }
    }
  }
}

resource "aws_athena_workgroup" "analytics" {
  name        = "${var.project_name}-analytics"
  description = "Ad-hoc queries over CloudFront access logs."

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = false

    result_configuration {
      output_location = "s3://${aws_s3_bucket.logs.id}/athena-results/"

      encryption_configuration {
        encryption_option = "SSE_S3"
      }
    }
  }

  force_destroy = true
}

resource "aws_athena_named_query" "top_pages" {
  name        = "${var.project_name}-top-pages-last-30-days"
  description = "Most requested HTML pages in the last 30 days."
  database    = aws_glue_catalog_database.analytics.name
  workgroup   = aws_athena_workgroup.analytics.id

  query = <<-SQL
    SELECT uri, count(*) AS views
    FROM ${aws_glue_catalog_database.analytics.name}.cloudfront_access_logs
    WHERE date >= current_date - interval '30' day
      AND status = 200
      AND uri NOT LIKE '/_next/%'
    GROUP BY uri
    ORDER BY views DESC
    LIMIT 50
  SQL
}

resource "aws_athena_named_query" "top_referrers" {
  name        = "${var.project_name}-top-referrers-last-30-days"
  description = "Where visitors arrived from in the last 30 days."
  database    = aws_glue_catalog_database.analytics.name
  workgroup   = aws_athena_workgroup.analytics.id

  query = <<-SQL
    SELECT referrer, count(*) AS hits
    FROM ${aws_glue_catalog_database.analytics.name}.cloudfront_access_logs
    WHERE date >= current_date - interval '30' day
      AND referrer <> '-'
    GROUP BY referrer
    ORDER BY hits DESC
    LIMIT 50
  SQL
}
