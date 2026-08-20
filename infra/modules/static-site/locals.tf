locals {
  site_bucket_name = "${var.project_name}-site-${var.domain_name}"
  www_domain       = "www.${var.domain_name}"
  domain_aliases   = [var.domain_name, local.www_domain]
  has_api_origin   = var.api_origin_domain != ""
  s3_origin_id     = "s3-site"
  api_origin_id    = "api-contact"
}
