resource "aws_sesv2_email_identity" "domain" {
  email_identity = var.domain_name
}

resource "aws_route53_record" "dkim" {
  count = 3

  zone_id = var.hosted_zone_id
  name    = "${element(aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens, count.index)}._domainkey.${var.domain_name}"
  type    = "CNAME"
  ttl     = 600
  records = ["${element(aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens, count.index)}.dkim.amazonses.com"]
}

resource "aws_sesv2_email_identity" "recipient" {
  email_identity = var.recipient_email
}

resource "aws_route53_record" "dmarc" {
  zone_id = var.hosted_zone_id
  name    = "_dmarc.${var.domain_name}"
  type    = "TXT"
  ttl     = 600
  records = ["v=DMARC1; p=none; rua=mailto:${var.recipient_email}"]
}
