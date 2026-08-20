variable "project_name" {
  description = "Short slug used to name and tag resources."
  type        = string
}

variable "log_retention_days" {
  description = "Days CloudFront access logs are kept before expiry."
  type        = number
  default     = 90
}

variable "query_result_retention_days" {
  description = "Days Athena query results are kept before expiry."
  type        = number
  default     = 14
}
