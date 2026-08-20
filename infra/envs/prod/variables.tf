variable "project_name" {
  description = "Short slug used to name and tag every resource."
  type        = string
  default     = "rminghi-site"
}

variable "aws_region" {
  description = "Region hosting S3, Lambda, API Gateway and SES."
  type        = string
  default     = "eu-west-1"
}

variable "aws_profile" {
  description = "Local AWS CLI profile used to apply this stack."
  type        = string
}

variable "domain_name" {
  description = "Apex domain already registered and hosted in Route 53."
  type        = string
}

variable "recipient_email" {
  description = "Inbox that receives contact form submissions."
  type        = string
}

variable "github_repository" {
  description = "Repository allowed to deploy, as owner/name."
  type        = string
}

variable "create_github_oidc_provider" {
  description = "Set false when the account already trusts the GitHub OIDC issuer."
  type        = bool
  default     = true
}

variable "locales" {
  description = "Locale segments the site is exported under, most preferred first."
  type        = list(string)
  default     = ["en", "it"]
}

variable "default_locale" {
  description = "Locale the root path falls back to."
  type        = string
  default     = "en"
}
