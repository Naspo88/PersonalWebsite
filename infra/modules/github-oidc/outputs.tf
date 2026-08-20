output "deploy_role_arn" {
  description = "Value for the AWS_DEPLOY_ROLE_ARN GitHub Actions variable."
  value       = aws_iam_role.deploy.arn
}
