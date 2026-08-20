# Next steps — manual work

Everything that still needs a human. The code is complete and tested; nothing
here has been applied to AWS yet, so no resources exist and nothing is costing
money.

Work through the sections in order. A, B and D are needed to get the site
live. C can happen before or after — the site deploys fine with placeholders
visible.

---

## A. Things Terraform cannot do

### A1. Register the domain

Route 53 console → **Registered domains** → **Register domains**.

- ICANN emails the registrant address a verification link. The domain is
  suspended until you click it. Allow a few hours.
- Registration creates the hosted zone automatically. **Do not create one
  yourself** — Terraform reads the existing zone with a data source and will
  fail or attach to the wrong zone if there are two.

### A2. Confirm you are pointing at the right AWS account

```bash
aws sts get-caller-identity --profile default
```

### A3. Verify the SES recipient address

After the first `terraform apply`, AWS emails a confirmation link to the
address in `recipient_email`. Click it.

Until you do, the contact form accepts submissions and delivers nothing.
SES starts in sandbox mode and only sends to verified addresses — since you
are the only recipient, this single click is enough. No production-access
request is needed.

The *sender* domain verifies itself: Terraform writes the DKIM CNAME records
into Route 53.

---

## B. Configuration values

### B1. `infra/envs/prod/terraform.tfvars`

Copy `terraform.tfvars.example`. All four variables are **required and have
no defaults**:

| Variable | Value |
|---|---|
| `aws_profile` | `"default"` |
| `domain_name` | the domain from A1, no scheme, no trailing slash |
| `recipient_email` | `"robertominghi@msn.com"` |
| `github_repository` | see the warning below |

> **`github_repository` will block `terraform apply` even though GitHub is
> deferred.** Two options:
>
> - Put a placeholder such as `"robertominghi/personal-website"`. This creates
>   an inert IAM role plus a real GitHub OIDC provider in the account. Harmless,
>   and correct it later in section E.
> - Or comment out the `module "github_oidc"` block in `infra/envs/prod/main.tf`
>   and the `deploy_role_arn` output in `infra/envs/prod/outputs.tf`.

### B2. `infra/envs/prod/backend.hcl`

Copy `backend.hcl.example` and paste the bucket name printed by
`terraform output` in `infra/bootstrap` (step D1).

### B3. `site/.env.local`

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Do this before the first deploy.** Nothing sets this automatically. Without
it the sitemap, canonical URLs, `hreflang` alternates and Open Graph image
URLs are all built pointing at `http://localhost:3000`, which search engines
and LinkedIn previews will happily index.

### B4. `site/lib/site-config.ts`

One `TODO` in `repositoryUrl`, used by the "Source on GitHub" link in the
footer. Point it at a real repository or remove the link from
`site/components/site-footer.tsx`.

---

## C. Content — 32 placeholders

Unfilled placeholders render literally as `TODO — …` on the page, so nothing
plausible-but-wrong can ship by accident. Fill them in whenever you like.

| File | TODOs | What is missing |
|---|---|---|
| `site/content/profile.ts` | 8 | Role, location, positioning line, two About paragraphs, GitHub and LinkedIn URLs — **both locales** |
| `site/content/cv.ts` | 10 | Job titles, start dates, role summaries, highlights, stack, skill lists |
| `site/content/projects.ts` | 14 | The single placeholder project |

Notes:

- **Why the CV is incomplete:** the public LinkedIn profile exposed education,
  certifications, languages and the current employer, all of which are already
  in `content/cv.ts`. It did **not** expose job titles or dates. Those were left
  as placeholders rather than guessed.
- **Adding a project:** duplicate `placeholderProject` in
  `site/content/projects.ts`, give it a unique `slug`, and add it to the
  `projects` array. The grid card and the detail page both render from it. Set
  `featured: true` to surface it on the homepage.
- **Interface copy** (button labels, section headings) lives in
  `site/content/i18n/en.ts` and `it.ts`, not in the components.
- **Design rules** are in `design-system/roberto-minghi/MASTER.md` — colour
  tokens, type scale, spacing, motion and the accessibility floor.

---

## D. Deploy sequence

### D1. Create the Terraform state bucket (once)

```bash
cd infra/bootstrap
terraform init
terraform apply -var 'aws_profile=default'
```

Copy the `backend_config` output into `infra/envs/prod/backend.hcl` (step B2).

### D2. Apply the infrastructure

```bash
cd ../envs/prod
terraform init -backend-config=backend.hcl
terraform apply
```

This blocks for a few minutes while the ACM certificate validates over DNS.
That is expected — the certificate lives in `us-east-1` because CloudFront
requires it there; everything else is in `eu-west-1`.

### D3. Publish the site

```bash
cd ../../..
make deploy
```

Builds the static export, generates the Open Graph images and CV PDFs, syncs
to S3 with correct cache headers, and invalidates CloudFront.

### D4. Verify

```bash
curl -I https://yourdomain.com                      # 200, HSTS present
curl -I http://yourdomain.com                       # 301 to https
curl -I https://yourdomain.com/en/cv/               # 200
curl -H 'Accept-Language: it' -I https://yourdomain.com/   # 302 to /it/
```

- Direct S3 object URL should return **403** (proves the bucket is locked to
  CloudFront).
- Submit the contact form and confirm the email arrives.
- Visit a nonexistent path and confirm the dark 404 page renders, not a white one.

---

## E. Later — continuous deployment

`.github/workflows/deploy.yml` already exists and assumes an IAM role over
OIDC, so there are no AWS keys in GitHub.

1. Create the GitHub repository and push.
2. If you used a placeholder in B1, correct `github_repository` and re-apply.
   The trust policy is pinned to that exact `owner/repo` on the `main` branch,
   so a wrong value means the workflow cannot authenticate.
3. Set four repository **variables** (Settings → Secrets and variables →
   Actions → Variables). These are variables, not secrets — none is sensitive.

| Variable | Where it comes from |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | `terraform output deploy_role_arn` |
| `SITE_BUCKET` | `terraform output site_bucket_name` |
| `SITE_DOMAIN` | your domain, no scheme |
| `CLOUDFRONT_DISTRIBUTION_ID` | `terraform output distribution_id` |

Pushes to `main` that touch `site/**` then build and deploy automatically.

---

## Reference

### Running cost

| Item | Cost |
|---|---|
| Domain registration | ~€13 / year |
| Route 53 hosted zone | $0.50 / month |
| S3, CloudFront, Lambda, API Gateway, SES | free tier at this traffic |
| **Realistic total** | **$1–2 / month plus the domain** |

### Useful commands

```bash
make help        # list every target
make dev         # local dev server at /en/
make test        # 25 tests: contact lambda + CloudFront router
make build       # static export, OG images, CV PDFs
make plan        # preview infrastructure changes
make deploy      # build, upload, invalidate
```

### Known trade-offs, if you want to revisit them

- `make deploy` invalidates `/*`. Simple, but it burns CloudFront invalidation
  credits on frequent deploys. Narrowing it to changed paths is a later
  optimisation.
- The Content-Security-Policy allows `'unsafe-inline'` for scripts. This is
  required: Next.js hydrates a static export through inline flight-data
  scripts, and a prerendered site cannot mint a per-request nonce.
- No WAF. It would add roughly $6/month and is only worth it if the contact
  endpoint attracts abuse. API Gateway throttling plus the honeypot and timing
  checks cover the realistic case.
- Analytics are CloudFront access logs queried in Athena, expiring after 90
  days. No cookies, no third-party scripts, so no consent banner is required.
