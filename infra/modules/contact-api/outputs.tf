output "api_origin_domain" {
  description = "Hostname CloudFront uses as the /api/* origin."
  value       = replace(aws_apigatewayv2_api.contact.api_endpoint, "https://", "")
}

output "function_name" {
  description = "Lambda function name, handy for tailing logs."
  value       = aws_lambda_function.contact.function_name
}

output "sender_email" {
  description = "From address used for contact form notifications."
  value       = local.sender_email
}
