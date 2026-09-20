# Capstone Project — Execute Tech Academy

Deploying frontend and backend website through using github Action pipeline AWS ECS while provisioning all resources with Terraform.

## Initial Environment Setup 

These steps happen once, before touching the project's actual
infrastructure they set up the trust relationship AWS needs to let
GitHub Actions deploy on our behalf, and the storage location Terraform
uses to remember what it has built.

### Step 1: Configure AWS

**1.1 — Create an OIDC Identity Provider**

In the AWS Console:
1. Go to **IAM → Identity providers**
2. Click **Add provider**
3. Choose:
   - Provider type: **OpenID Connect**
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`
4. Create the provider.

This tells AWS: *"trust identity tokens issued by GitHub Actions."*

**1.2 — Create an IAM Role**

Create a role that GitHub Actions can assume:
- Trusted entity type: **Web identity**
- Identity provider: `token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`

The trust policy should look similar to:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
      },
      "StringLike": {
        "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_USERNAME/YOUR_REPOSITORY:*"
      }
    }
  }]
}
```
Replace `<ACCOUNT_ID>`, `YOUR_GITHUB_USERNAME`, and `YOUR_REPOSITORY`
accordingly. The `sub` condition restricts this role so **only workflows
running inside this specific repository** can assume it.

**1.3 — Attach Permissions**

Attach the policies the workflow needs, for example:
- `AmazonEC2ContainerRegistryPowerUser`
- `AmazonECS_FullAccess`
- `AmazonS3FullAccess`

(A custom least-privilege policy is preferable long-term; the broader
managed policies above were what ultimately resolved a persistent
`AssumeRoleWithWebIdentity` authorization error during pipeline setup —
see the CI/CD section below for details.)

### Step 2: Configure GitHub

Save the IAM Role ARN as a repository secret:
- **Settings → Secrets and variables → Actions → New repository secret**
- Name: `AWS_ROLE_ARN`
- Value: `arn:aws:iam::<ACCOUNT_ID>:role/GitHubActionsRole` (or whichever
  role name was used)

At this point, authentication between GitHub Actions and AWS is
confirmed working.

### Step 3: Set Up the Remote S3 Backend for Terraform State

Terraform needs somewhere safe and persistent to store its state — its
own memory of what it has built. Think of it like a diary: instead of
keeping that diary on one laptop where it could be lost, it's kept in a
locked box (an S3 bucket) that any authorized machine can read from and
write to.

**Bootstrap problem:** a Terraform project can't store its own state in a
bucket it hasn't created yet. This is solved with a small, separate,
one-time "bootstrap" project that creates just the S3 bucket, using local
state (fine for this narrow, one-time use).

1. Create a directory: `state-bootstrap/`
2. Inside it, create `main.tf`:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "eu-north-1"
}

# Create S3 bucket
resource "aws_s3_bucket" "mybucket" {
  bucket = "nenny-s3-capstone"

  tags = {
    Name        = "s3-bucket"
    Environment = "Dev"
  }
}

# Enable encryption on the bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "mybucket" {
  bucket = aws_s3_bucket.mybucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

3. Run:
```bash
cd state-bootstrap
terraform init
terraform apply
```

This creates the `nenny-s3-capstone` bucket, encrypted, entirely through
Terraform (satisfying the project's "everything must be created by
Terraform" rule) — the actual bucket the main infrastructure project's
`backend.tf` points to as its remote state backend.

With this done, the environment is ready for the main infrastructure
build described below.

---



## 1. Setting up environment Locally with Docker  (Stage 1)

Before touching AWS, the React website was built and run locally in Docker to
confirm that Docker file and nginx configuration worked correctly using http://127.0.0.1:8080.

<img width="1330" height="662" alt="image" src="https://github.com/user-attachments/assets/b969a522-042d-442a-8021-e95909c879e5" />

```

```

**Homepage loading locally via Docker:**

<img width="1330" height="662" alt="image" src="https://github.com/user-attachments/assets/7e8b31d1-f12c-4853-9f12-601f119512b6" />
)

**Deep-route refresh test (`/courses`), confirming nginx's `try_files`
fallback works — no 404 on hard refresh:**

<img width="1245" height="686" alt="image" src="https://github.com/user-attachments/assets/6a4b1003-6ae8-4755-af0f-e24589724733" />


---

## 2. AWS Billing Alarm (Cost Discipline)

Set up on day one, before provisioning anything, per the project's cost
discipline requirement.

**Confirming billing permissions / preferences before creating the alarm:**

![AWS billing permissions](assets/01-aws-billing-permissions.png)

**CloudWatch billing alarm conditions (threshold: $20):**

![Billing alarm conditions](assets/02-billing-alarm-conditions.png)

---

## 3. Terraform State Backend 

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

<img width="1206" height="393" alt="image" src="https://github.com/user-attachments/assets/3c6ba728-4229-45ac-9382-cbe214965485" />



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

<img width="1108" height="665" alt="image" src="https://github.com/user-attachments/assets/b626a694-d660-4b33-8ef2-68cc8f51b1d4" />


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

<img width="1219" height="638" alt="image" src="https://github.com/user-attachments/assets/d631abf0-1d7f-4880-8984-1c58fcef4477" />


---

## 7. First Live Test — Before an Image Was Pushed

With infrastructure up but ECR still empty, the ALB correctly returned a
`503 Service Temporarily Unavailable` — confirming the ALB, security groups,
and networking were wired correctly, with no healthy target yet.

<img width="812" height="204" alt="image" src="https://github.com/user-attachments/assets/47122ab9-17f2-4559-a6c0-d4f8422d2643" />


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

<img width="886" height="445" alt="image" src="https://github.com/user-attachments/assets/eedbaa3b-caf2-4505-8955-7243cb356817" />


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

<img width="1308" height="683" alt="image" src="https://github.com/user-attachments/assets/bd397faf-78b9-4670-a712-a2b637fcfc22" />


### Known issue — OIDC authentication

The `Configure AWS credentials via OIDC` step currently fails with:
```
Error: Could not assume role with OIDC: Not authorized to perform sts:AssumeRoleWithWebIdentity
```

**Full CI/CD pipeline, all four stages green, OIDC authentication working:**

<img width="1248" height="508" alt="image" src="https://github.com/user-attachments/assets/6430ab50-22df-47f0-97cf-9d7b27e34148" />


The OIDC step initially failed repeatedly with
`Not authorized to perform sts:AssumeRoleWithWebIdentity`, despite the
trust policy, OIDC provider, and IAM role all matching AWS's documented
configuration (verified via `aws iam get-role` and
`aws iam get-open-id-connect-provider`, and confirmed again after a full
destroy/recreate of all three OIDC resources through Terraform). The fix
was attaching broader managed policies (`AmazonEC2ContainerRegistryPowerUser`,
`AmazonECS_FullAccess`) to the GitHub Actions IAM role — the original
narrowly-scoped inline policy was missing a permission the pipeline needed,
and the error message pointed at the trust step rather than the actual gap.

---

## Project 2 — EKS with Terraform 

### Architecture

```
Internet → LoadBalancer Service → Pods (2 replicas, EKS managed node group)
                                          ↓
                          Same RDS instance from Project 1
                    (EKS node security group → RDS security group, port 5432)
```

### What was built

- **EKS cluster** — provisioned with the `terraform-aws-modules/eks/aws`
  module (v21.x), Kubernetes 1.33, reusing Project 1's VPC
- **Managed node group** — 2 nodes, `t3.small`
- **Security group bridge** — a dedicated rule allowing the EKS node
  security group into the RDS security group on port 5432 — the required
  "join" between the two projects
- **Counter application** — the Node.js/Express/`pg` app given in the
  brief, containerized, pushed to the second ECR repository
- **Kubernetes manifests** — Deployment (2 replicas, resource
  requests/limits, readiness probe on `/healthz`), Secret (DB credentials,
  injected as environment variables, values sourced from Secrets Manager),
  Service (type `LoadBalancer`)

### The node group investigation

The most significant technical challenge of the whole project: the EKS
control plane consistently reached `ACTIVE`, but the managed node group
repeatedly failed with `Unhealthy nodes in the kubernetes cluster`.

**Amazon Q's diagnosis, run against the live cluster:**

<img width="1359" height="560" alt="image" src="https://github.com/user-attachments/assets/9d045a03-e0df-472b-82d3-00a64b7c8795" />


<img width="1346" height="564" alt="image" src="https://github.com/user-attachments/assets/8c753930-cfb3-4066-812b-ea09c567663d" />


Root cause: the AWS VPC CNI plugin (`aws-node` DaemonSet) was never
actually running on the nodes, despite Terraform's `addons` block
instructing the module to install it — likely because an earlier failed
apply attempt left the cluster in a state where the addon installation
step never completed.

**Attempts made, in order, before finding the root cause:**
1. Module v20.x baseline — failed
2. Bumped to module v21.x (AWS provider v6 compatibility) — failed
3. Enabled `endpoint_private_access` alongside public access — failed
4. Added explicit `access_entries` for cluster admin permissions — failed
5. Explicitly enabled core addons (`vpc-cni`, `kube-proxy`, `coredns`) —
   addons installed at the API level, node group still failed
6. Relaxed launch template IMDS settings (`http_tokens = "optional"`) —
   failed
7. Switched the cluster and node group to Project 1's **public** subnets
   instead of private, to rule out NAT Gateway/private-subnet routing as
   the cause — **this attempt succeeded**, nodes reached `Ready`

Once nodes were healthy, using Amazon Q's console-integrated
troubleshooting confirmed the specific missing piece (`aws-node` pods
absent) rather than leaving it as an unresolved hypothesis.

### Proof

**Live application counting real visits against the Project 1 RDS
instance:**

<img width="1263" height="587" alt="image" src="https://github.com/user-attachments/assets/c137687b-630e-4616-9ff3-63f777a8422e" />


Refreshing the page increases the count on each load direct proof the
pod is writing to and reading from RDS on every request.

**Application logs confirming successful database connection:**
```
listening on 3000
Table check/create succeeded
```
<img width="1366" height="639" alt="image" src="https://github.com/user-attachments/assets/39b68f9f-332b-4833-a874-5ae789dc26f1" />


<img width="1263" height="450" alt="image" src="https://github.com/user-attachments/assets/aa56627c-1945-442a-861b-ad4c1b13ba2e" />


---


## Destroyed


## Repository Structure

```
.
├── frontend/                     # React app (Project 1 website source)
├── Dockerfile                    # Multi-stage build for the website
├── nginx.conf                    # SPA fallback config
├── .github/workflows/deploy.yml  # CI/CD pipeline, OIDC auth
├── state-bootstrap/               # One-time Terraform: S3 backend for state
├── terraform/                     # Project 1 infrastructure (VPC → ALB, OIDC)
├── backend_project2/
│   ├── terraform/                 # Project 2: EKS cluster + RDS security group bridge
│   ├── eks-app/                   # Counter application source + Dockerfile
│   └── k8s/                       # Deployment, Service, Secret (template) manifests
└── RUNBOOK-rebuild-and-verify.md  # Full rebuild + verification command reference
```

Note: `backend_project2/k8s/secret.yaml` (the real Secret, with live RDS
credentials) is intentionally excluded from version control via
`.gitignore`. `secret.yaml.template` shows its structure with placeholder
values.

---

## Rebuild Instructions 

Both projects were destroyed after verification to avoid unnecessary AWS
charges. To bring everything back up:

```bash
# 1. Project 1 infrastructure
cd terraform
terraform init
terraform apply

# 2. Push a fresh website image (or just push to `main` on GitHub —
#    the working CI/CD pipeline will build and deploy automatically)
$password = aws ecr get-login-password --region eu-north-1
docker login --username AWS --password $password 159989389228.dkr.ecr.eu-north-1.amazonaws.com
docker build --build-arg REACT_APP_API_URL=http://localhost:8080 -t eta-web .
docker tag eta-web:latest 159989389228.dkr.ecr.eu-north-1.amazonaws.com/capstone-website:latest
docker push 159989389228.dkr.ecr.eu-north-1.amazonaws.com/capstone-website:latest

# 3. Project 2: EKS cluster
cd backend_project2/terraform
terraform init
terraform apply --auto-approve

# 4. Deploy the counter app
aws eks update-kubeconfig --region eu-north-1 --name capstone-eks
kubectl create namespace visit-counter
kubectl apply -f ../k8s/secret.yaml       # recreate locally from the template — never commit real values
kubectl apply -f ../k8s/deployment.yaml
kubectl apply -f ../k8s/service.yaml
```

Full step-by-step verification commands (health checks, `psql` proof,
`kubectl` checks) are in `RUNBOOK-rebuild-and-verify.md`.

**Total rebuild time: approximately 30–40 minutes** (RDS and the EKS node
group are the slowest steps).

---

## Cost Discipline

A CloudWatch billing alarm was configured on day one, before any resource
was provisioned. `terraform destroy` was run on both projects after
verification was complete, to avoid unnecessary charges between work
sessions and ahead of defence.

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

Confirm these are installed and configured:
```bash
aws --version
terraform --version
docker --version
kubectl version --client
```
Confirm AWS credentials work:
```bash
aws sts get-caller-identity
```

---

## Stage 1 — Terraform State Backend (bootstrap)

Only needed if `state-bootstrap` was also destroyed — normally this stays
up permanently and you can skip to Stage 2.

```bash
cd state-bootstrap
terraform init
terraform apply
```
Type `yes` when prompted. Creates the S3 bucket (`nenny-s3-capstone`) that
stores all other Terraform state, encrypted.

---

## Stage 2 — Project 1 Infrastructure

```bash
cd ../terraform
terraform init
terraform apply
```
Type `yes` when prompted. Creates, in order: VPC, subnets, Internet
Gateway, NAT Gateway, route tables, security groups, RDS, ECR (both
repos), IAM roles, ECS cluster/task definition/service, ALB, and the
GitHub Actions OIDC provider/role.

**~15-20 minutes** — RDS and the NAT Gateway are the slowest parts.

---

## Stage 3 — Get the Website Live (two options)

### Option A — automatic, via the CI/CD pipeline (recommended)

Since the pipeline authenticates via OIDC and the ECS/ECR resources now
exist again with matching names, just push to `main`:
```bash
git commit --allow-empty -m "trigger deploy"
git push
```
Watch it run in GitHub → Actions tab. It lints, builds, scans, pushes to
ECR, and deploys to ECS automatically — no manual Docker commands needed.

### Option B — manual (if you want to push a specific image immediately)

```bash
$password = aws ecr get-login-password --region eu-north-1
docker login --username AWS --password $password 159989389228.dkr.ecr.eu-north-1.amazonaws.com

docker build --build-arg REACT_APP_API_URL=http://localhost:8080 -t eta-web .
docker tag eta-web:latest 159989389228.dkr.ecr.eu-north-1.amazonaws.com/capstone-website:latest
docker push 159989389228.dkr.ecr.eu-north-1.amazonaws.com/capstone-website:latest
```
ECS will pick up the new image automatically within a minute or two.

---

## Stage 4 — Verify Project 1

```bash
# Confirm task is running
aws ecs list-tasks --cluster capstone-cluster
aws ecs describe-tasks --cluster capstone-cluster --tasks <TASK_ARN> \
  --query "tasks[0].{lastStatus:lastStatus,healthStatus:healthStatus}"

# Confirm ALB sees a healthy target
aws elbv2 describe-target-health --target-group-arn $(aws elbv2 describe-target-groups --names capstone-website-tg --query "TargetGroups[0].TargetGroupArn" --output text)

# Get the site URL
aws elbv2 describe-load-balancers --names capstone-alb --query "LoadBalancers[0].DNSName" --output text
```
Open the returned URL in a browser — confirm the homepage loads, then
navigate to a deep route (e.g. `/blog`) and hit F5 to confirm the SPA
fallback still works live.

---

## Stage 5 — Project 2: EKS Cluster

```bash
cd ../backend_project2/terraform
terraform init
terraform apply --auto-approve
```
Creates the EKS cluster, managed node group (2× `t3.small`), OIDC
provider for IRSA, and the security group rule bridging EKS nodes to
Project 1's RDS on port 5432.

**~10-20 minutes** — the node group is the slowest part; if it fails on
`Unhealthy nodes`, see the troubleshooting note at the bottom of this file.

---

## Stage 6 — Connect kubectl and Confirm Nodes

```bash
aws eks update-kubeconfig --region eu-north-1 --name capstone-eks
kubectl get nodes
```
Confirm 2 nodes, both `STATUS: Ready`.

---

