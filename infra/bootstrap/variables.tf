variable "project_name" {
  description = "Short slug used to name and tag every resource in this project."
  type        = string
  default     = "rminghi-site"
}

variable "aws_region" {
  description = "Region hosting the Terraform state bucket."
  type        = string
  default     = "eu-west-1"
}

variable "aws_profile" {
  description = "Local AWS CLI profile used to apply this stack."
  type        = string
}
