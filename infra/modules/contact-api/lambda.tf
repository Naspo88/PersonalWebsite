locals {
  function_name = "${var.project_name}-contact"
  sender_email  = "noreply@${var.domain_name}"
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "contact" {
  name               = "${local.function_name}-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "aws_iam_policy_document" "contact" {
  statement {
    sid     = "WriteLogs"
    effect  = "Allow"
    actions = ["logs:CreateLogStream", "logs:PutLogEvents"]

    resources = ["${aws_cloudwatch_log_group.contact.arn}:*"]
  }

  statement {
    sid     = "SendContactEmail"
    effect  = "Allow"
    actions = ["ses:SendEmail"]

    resources = [
      aws_sesv2_email_identity.domain.arn,
      aws_sesv2_email_identity.recipient.arn,
    ]
  }
}

resource "aws_iam_role_policy" "contact" {
  name   = "${local.function_name}-policy"
  role   = aws_iam_role.contact.id
  policy = data.aws_iam_policy_document.contact.json
}

resource "aws_cloudwatch_log_group" "contact" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = var.log_retention_days
}

resource "aws_lambda_function" "contact" {
  function_name = local.function_name
  role          = aws_iam_role.contact.arn
  runtime       = "nodejs22.x"
  architectures = ["arm64"]
  handler       = "index.handler"
  memory_size   = 256
  timeout       = 10

  filename         = var.lambda_bundle_path
  source_code_hash = filebase64sha256(var.lambda_bundle_path)

  environment {
    variables = {
      RECIPIENT_EMAIL = var.recipient_email
      SENDER_EMAIL    = local.sender_email
      ALLOWED_ORIGIN  = var.allowed_origin
    }
  }

  depends_on = [
    aws_iam_role_policy.contact,
    aws_cloudwatch_log_group.contact,
  ]
}
