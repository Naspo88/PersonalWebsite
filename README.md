# Personal website

CV, profile and project portfolio. Static Next.js site on S3 + CloudFront,
every AWS resource managed by Terraform in this repository.

```
site/     Next.js app (static export, EN + IT)
lambda/   Contact form handler
infra/    Terraform: bootstrap, modules, prod stack
```

## Architecture

Visitors hit CloudFront, which serves prerendered HTML from a private S3
bucket via Origin Access Control. A viewer-request CloudFront Function
canonicalises directory URLs and redirects `/` to `/en/` or `/it/` based on
`Accept-Language`. The contact form posts to `/api/*` on the *same*
distribution, routed to API Gateway and a Lambda that sends through SES —
so the form is same-origin and no CORS is involved.

Everything runs in `eu-west-1` except the ACM certificate, which CloudFront
requires in `us-east-1` and which a second aliased provider creates there.

## Local development

```bash
make install     # site and lambda dependencies
make dev         # http://localhost:3000/en/
make test        # lambda and CloudFront function suites
make build       # static export to site/out, plus OG images and CV PDFs
```

`npm run build` runs three steps: `prebuild` renders the Open Graph images,
`build` exports the site, `postbuild` prints the CV pages to PDF with
Playwright. The PDF and the CV page render from the same `content/cv.ts`,
so the two cannot drift.

Set `NEXT_PUBLIC_SITE_URL` (see `site/.env.example`) once the domain exists.
Without it, canonical URLs and the sitemap fall back to `localhost`.

## Editing content

| What | Where |
|---|---|
| Name, role, positioning, about, socials | `site/content/profile.ts` |
| Experience, education, skills, certifications, languages | `site/content/cv.ts` |
| Projects | `site/content/projects.ts` — duplicate `placeholderProject` |
| Interface copy, both locales | `site/content/i18n/{en,it}.ts` |
| Design tokens and rules | `design-system/roberto-minghi/MASTER.md` |

Unfilled placeholders render literally as `TODO — …` so they are obvious
on the page rather than silently plausible.

## First deployment

1. Register the domain in the Route 53 console. The hosted zone is created
   for you; Terraform reads it with a data source.
2. Create the state bucket:
   ```bash
   cd infra/bootstrap && terraform init && terraform apply
   ```
   Copy `backend_config` from the output into `infra/envs/prod/backend.hcl`.
3. Configure and apply the stack:
   ```bash
   cd infra/envs/prod
   cp terraform.tfvars.example terraform.tfvars   # fill in domain and email
   terraform init -backend-config=backend.hcl
   terraform apply
   ```
   The ACM certificate validates over DNS, which usually takes a few minutes.
4. Verify the SES recipient address from the confirmation email AWS sends.
   SES starts in sandbox mode and will only deliver to verified addresses;
   since the only recipient is you, that one verification is enough.
5. Publish:
   ```bash
   make deploy
   ```

## Continuous deployment

`.github/workflows/deploy.yml` assumes an IAM role over OIDC — there are no
AWS keys in GitHub. After the first apply, set these repository variables:

| Variable | Source |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | `terraform output deploy_role_arn` |
| `SITE_BUCKET` | `terraform output site_bucket_name` |
| `SITE_DOMAIN` | your domain |
| `CLOUDFRONT_DISTRIBUTION_ID` | `terraform output distribution_id` |

The workflow's trust policy is pinned to `main` on the repository named in
`github_repository`, so update that variable before relying on it.

## Analytics

CloudFront access logs land in a dedicated bucket and expire after 90 days.
Query them in Athena using the `*-analytics` workgroup; two saved queries
cover top pages and top referrers. No cookies, no third-party scripts, and
therefore no consent banner.
