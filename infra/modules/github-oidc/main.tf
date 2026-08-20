locals {
  issuer_host     = "token.actions.githubusercontent.com"
  provider_arn    = var.create_oidc_provider ? aws_iam_openid_connect_provider.github[0].arn : data.aws_iam_openid_connect_provider.github[0].arn
  allowed_subject = "repo:${var.github_repository}:ref:refs/heads/${var.github_branch}"
}

resource "aws_iam_openid_connect_provider" "github" {
  count = var.create_oidc_provider ? 1 : 0

  url            = "https://${local.issuer_host}"
  client_id_list = ["sts.amazonaws.com"]
}

data "aws_iam_openid_connect_provider" "github" {
  count = var.create_oidc_provider ? 0 : 1

  url = "https://${local.issuer_host}"
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [local.provider_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "${local.issuer_host}:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "${local.issuer_host}:sub"
      values   = [local.allowed_subject]
    }
  }
}

resource "aws_iam_role" "deploy" {
  name                 = "${var.project_name}-github-deploy"
  description          = "Assumed by GitHub Actions to publish the built site."
  assume_role_policy   = data.aws_iam_policy_document.assume_role.json
  max_session_duration = 3600
}

data "aws_iam_policy_document" "deploy" {
  statement {
    sid     = "ListSiteBucket"
    effect  = "Allow"
    actions = ["s3:ListBucket"]

    resources = [var.site_bucket_arn]
  }

  statement {
    sid    = "PublishSiteObjects"
    effect = "Allow"

    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:GetObject",
    ]

    resources = ["${var.site_bucket_arn}/*"]
  }

  statement {
    sid     = "InvalidateDistribution"
    effect  = "Allow"
    actions = ["cloudfront:CreateInvalidation"]

    resources = [var.distribution_arn]
  }
}

resource "aws_iam_role_policy" "deploy" {
  name   = "${var.project_name}-github-deploy"
  role   = aws_iam_role.deploy.id
  policy = data.aws_iam_policy_document.deploy.json
}
