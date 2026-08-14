# Capstone Project — Execute Tech Academy

Deploying frontend and backend website through using github Action pipeline AWS ECS while provisioning all resources with Terraform.


## 1. Setting up environment Locally with Docker  (Stage 1)

Before touching AWS, the React website was built and run locally in Docker to
confirm that Docker file and nginx configuration worked correctly using http://127.0.0.1:8080.

<img width="1330" height="662" alt="image" src="https://github.com/user-attachments/assets/b969a522-042d-442a-8021-e95909c879e5" />

```

```

**Homepage loading locally via Docker:**

![Local website running in Docker](assets/03-local-docker-website-running.png)

**Deep-route refresh test (`/courses`), confirming nginx's `try_files`
fallback works — no 404 on hard refresh:**

![Local deep route refresh](assets/04-local-deep-route-refresh.png)

---

## 2. AWS Billing Alarm (Cost Discipline)

Set up on day one, before provisioning anything, per the project's cost
discipline requirement.

**Confirming billing permissions / preferences before creating the alarm:**

![AWS billing permissions](assets/01-aws-billing-permissions.png)

**CloudWatch billing alarm conditions (threshold: $20):**

![Billing alarm conditions](assets/02-billing-alarm-conditions.png)

---

## 3. Terraform State Backend (Bootstrap)

A small, separate Terraform project (`state-bootstrap/`) was used to create
the S3 bucket that stores the *main* project's remote state — solving the
chicken-and-egg problem of a Terraform project storing its own state in a
bucket it hasn't created yet. This bootstrap project uses local state (a
one-time, solo-use case); the main project uses this bucket as a remote S3
backend with encryption enabled.

```hcl
resource "aws_s3_bucket" "mybucket" {
  bucket = "nenny-s3-capstone"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "mybucket" {
  bucket = aws_s3_bucket.mybucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

**Bootstrap `terraform apply` — S3 bucket created:**

![Terraform apply S3 bucket](assets/05-terraform-apply-s3-bucket.png)

---

## 4. Main Infrastructure — VPC, Networking, Security Groups

Built in dependency order in `terraform/resources.tf`:

- Custom VPC (`10.0.0.0/16`) with 2 public + 2 private subnets across
  `eu-north-1a` / `eu-north-1b`
- Internet Gateway (public subnet internet access)
- NAT Gateway + Elastic IP (private subnet outbound access)
- Public and private route tables, associated to their respective subnets
- Three chained security groups: ALB (open to internet on 80/443) → ECS
  (only from ALB) → RDS (only from ECS) — each referencing the previous
  group's ID rather than a CIDR block, per the "security groups reference
  each other, never 0.0.0.0/0" requirement

**VPC `terraform apply`:**

![VPC terraform apply](assets/06-vpc-terraform-apply.png)

---

## 5. RDS, ECR, IAM

- **RDS**: PostgreSQL 16, `db.t3.micro`, private subnets only, not publicly
  accessible, master password auto-generated and stored in Secrets Manager
  via `manage_master_user_password = true` (no password ever written to a
  `.tf` file)
- **ECR**: two repositories — `capstone-website` (this project) and
  `capstone-project2-app` (Project 2's counter app)
- **IAM**: a task execution role (pull images, write logs) and a task role
  (includes SSM permissions, required for ECS Exec) — both scoped to
  least-privilege AWS-managed policies

---

## 6. ECS + ALB

- ECS Fargate cluster, task definition (port 80, referencing the ECR image
  and both IAM roles), and service — tasks run in **private** subnets,
  `enable_execute_command = true` for ECS Exec
- Application Load Balancer in **public** subnets, target group with health
  check on `/`, listener on port 80, ECS service registered to the target
  group via a `load_balancer` block

**`terraform apply` creating the ALB and connecting it to the ECS service:**

![ECS service and ALB apply](assets/07-ecs-service-alb-apply.png)

---

## 7. First Live Test — Before an Image Was Pushed

With infrastructure up but ECR still empty, the ALB correctly returned a
`503 Service Temporarily Unavailable` — confirming the ALB, security groups,
and networking were wired correctly, with no healthy target yet.

![503 before image push](assets/08-alb-503-before-image-push.png)

---

## 8. Pushing the Image and Going Live

```bash
$password = aws ecr get-login-password --region eu-north-1
docker login --username AWS --password $password 159989389228.dkr.ecr.eu-north-1.amazonaws.com

docker tag eta-web:latest 159989389228.dkr.ecr.eu-north-1.amazonaws.com/capstone-website:latest
docker push 159989389228.dkr.ecr.eu-north-1.amazonaws.com/capstone-website:latest
```

Once pushed, ECS picked up the image, the task went `RUNNING`, and the ALB
target group reported the task as `healthy`.

**Live website, live deep-route refresh test on the actual ALB URL
(`http://capstone-alb-865717118.eu-north-1.elb.amazonaws.com/blog`),
confirming nginx's fallback works in production, not just locally:**

![Live website deep route](assets/09-live-website-deep-route.png)

---

## 9. Proving RDS Reachability (ECS Exec)

```bash
aws ecs execute-command --cluster capstone-cluster --task <TASK_ID> \
  --container website --interactive --command "/bin/sh"

# inside the container:
apk add --no-cache postgresql-client
psql -h capstone-db.cpuua4cqcadu.eu-north-1.rds.amazonaws.com \
  -U capstoneadmin -d capstonedb -c 'SELECT version();'
```

Result: `PostgreSQL 16.13 on x86_64-pc-linux-gnu...` — confirmed the ECS task
can reach RDS through the private network and the ECS → RDS security group
chain.

---

## 10. GitHub Actions Pipeline with OIDC

A workflow (`.github/workflows/deploy.yml`) was built to lint, build (with
the `REACT_APP_API_URL` build-arg), authenticate to AWS via OIDC (no static
keys), push to ECR tagged by commit SHA, and deploy a new ECS task
definition revision on every push to `main`.

**Pipeline running (lint, install, build steps passing):**

![GitHub Actions pipeline running](assets/10-github-actions-pipeline-running.png)

### Known issue — OIDC authentication

The `Configure AWS credentials via OIDC` step currently fails with:
```
Error: Could not assume role with OIDC: Not authorized to perform sts:AssumeRoleWithWebIdentity
```

Troubleshooting performed:
- Verified the IAM role's trust policy exactly matches the repo name/case
  (`repo:NennyEdo/Capstone_project_execute_tech:*`)
- Verified the OIDC provider's `ClientIDList` (`sts.amazonaws.com`) and
  thumbprint
- Checked repo-level Actions workflow permissions (Settings → Actions →
  General → Workflow permissions), set to "Read and write"
- Fully destroyed and recreated the OIDC provider, IAM role, and policy
  through Terraform (ruling out any residual corruption from an earlier
  manually-created provider)
- Attempted to use the official `github/actions-oidc-debugger` action to
  inspect the actual token claims GitHub sends — this action itself failed
  to build in the runner environment, blocking direct token inspection

Root cause not yet isolated. All AWS-side configuration matches AWS and
GitHub's documented setup exactly. To be revisited with more time.

---

## Rebuild / Destroy

See `RUNBOOK-rebuild-and-verify.md` for the full step-by-step sequence to
tear down and rebuild this infrastructure from scratch, including all
verification and testing commands.

```bash
cd terraform
terraform destroy   # tear down
terraform apply     # rebuild
```
