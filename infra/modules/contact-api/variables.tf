variable "project_name" {
  description = "Short slug used to name and tag resources."
  type        = string
}

variable "domain_name" {
  description = "Domain verified in SES and used as the From address domain."
  type        = string
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone receiving the SES DKIM records."
  type        = string
}

variable "recipient_email" {
  description = "Inbox that receives contact form submissions."
  type        = string
}

variable "allowed_origin" {
  description = "Origin permitted to submit the form, for example https://example.com."
  type        = string
}

variable "lambda_bundle_path" {
  description = "Path to the zipped Lambda bundle produced by lambda/contact/build.sh."
  type        = string
}

variable "throttle_rate_limit" {
  description = "Sustained requests per second accepted by the API stage."
  type        = number
  default     = 2
}

variable "throttle_burst_limit" {
  description = "Burst requests accepted by the API stage."
  type        = number
  default     = 5
}

variable "log_retention_days" {
  description = "CloudWatch retention for the Lambda log group."
  type        = number
  default     = 30
}
