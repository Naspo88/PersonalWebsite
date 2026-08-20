variable "project_name" {
  description = "Short slug used to name and tag resources."
  type        = string
}

variable "github_repository" {
  description = "Repository allowed to assume the deploy role, as owner/name."
  type        = string

  validation {
    condition     = can(regex("^[^/]+/[^/]+$", var.github_repository))
    error_message = "github_repository must be in owner/name form."
  }
}

variable "github_branch" {
  description = "Branch allowed to assume the deploy role."
  type        = string
  default     = "main"
}

variable "create_oidc_provider" {
  description = "Set false when the account already trusts the GitHub OIDC issuer."
  type        = bool
  default     = true
}

variable "site_bucket_arn" {
  description = "Bucket the deploy role may sync into."
  type        = string
}

variable "distribution_arn" {
  description = "Distribution the deploy role may invalidate."
  type        = string
}
