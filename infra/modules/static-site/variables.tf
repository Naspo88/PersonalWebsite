variable "project_name" {
  description = "Short slug used to name and tag resources."
  type        = string
}

variable "domain_name" {
  description = "Apex domain serving the site, for example robertominghi.com."
  type        = string
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone that already manages domain_name."
  type        = string
}

variable "locales" {
  description = "Locale segments the site is exported under, most preferred first."
  type        = list(string)
}

variable "default_locale" {
  description = "Locale the root path falls back to when Accept-Language matches nothing."
  type        = string
}

variable "api_origin_domain" {
  description = "API Gateway domain served under /api/*. Empty disables the behavior."
  type        = string
  default     = ""
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 covers Europe and North America."
  type        = string
  default     = "PriceClass_100"
}

variable "log_bucket_domain_name" {
  description = "Bucket domain receiving CloudFront access logs. Empty disables logging."
  type        = string
  default     = ""
}
