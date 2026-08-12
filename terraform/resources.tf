# Configure VPC
resource "aws_vpc" "my-vpc" {
  cidr_block = "10.0.0.0/16"
}

# create public_a subnet 
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.my-vpc.id
  cidr_block               = "10.0.1.0/24"
  availability_zone        = "eu-north-1a"
  map_public_ip_on_launch  = true
}

# create public_b subnet
resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.my-vpc.id
  cidr_block               = "10.0.2.0/24"
  availability_zone        = "eu-north-1b"
  map_public_ip_on_launch  = true
}

# create private_a subnet
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.my-vpc.id
  cidr_block         = "10.0.11.0/24"
  availability_zone  = "eu-north-1a"
}

# create private_b subnet
resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.my-vpc.id
  cidr_block         = "10.0.12.0/24"
  availability_zone  = "eu-north-1b"
}

# ============================================
# NETWORKING: INTERNET GATEWAY, NAT, ROUTE TABLES
# ============================================

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my-vpc.id

  tags = {
    Name = "capstone-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.my-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "capstone-public-rt"
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

resource "aws_eip" "nat" {
  domain = "vpc"

  tags = {
    Name = "capstone-nat-eip"
  }
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_a.id

  tags = {
    Name = "capstone-nat"
  }

  depends_on = [aws_internet_gateway.igw]
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.my-vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "capstone-private-rt"
  }
}

resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_b.id
  route_table_id = aws_route_table.private.id
}

# Configure SECURITY GROUP 1: ALB 
# Allows Anyone on the internet access

resource "aws_security_group" "alb" {
  name        = "capstone-alb-sg"
  description = "Allow HTTP/HTTPS from internet"
  vpc_id      = aws_vpc.my-vpc.id   # this firewall belongs to our VPC
}

# Rule: allow anyone (0.0.0.0/0) to reach the ALB on port 80 (HTTP)
resource "aws_vpc_security_group_ingress_rule" "alb_http" {
  security_group_id = aws_security_group.alb.id   # attach this rule to the ALB firewall
  cidr_ipv4          = "0.0.0.0/0"                  # 0.0.0.0/0 = literally everyone
  from_port          = 80
  to_port             = 80
  ip_protocol        = "tcp"
}

# Rule: allow anyone to reach the ALB on port 443 (HTTPS) too
resource "aws_vpc_security_group_ingress_rule" "alb_https" {
  security_group_id = aws_security_group.alb.id
  cidr_ipv4          = "0.0.0.0/0"
  from_port          = 443
  to_port             = 443
  ip_protocol        = "tcp"
}

# Rule: allow the ALB to send traffic OUT to anywhere 
resource "aws_vpc_security_group_egress_rule" "alb_all" {
  security_group_id = aws_security_group.alb.id
  cidr_ipv4          = "0.0.0.0/0"
  ip_protocol        = "-1"   # -1 means "all protocols/ports"
}


# SECURITY GROUP 2: ECS (where the app runs, allows traffic from ALB to ECS)

resource "aws_security_group" "ecs" {
  name        = "capstone-ecs-sg"
  description = "Allow traffic only from ALB"
  vpc_id      = aws_vpc.my-vpc.id
}

# Rule: allow traffic ONLY if it's coming from the ALB security group
resource "aws_vpc_security_group_ingress_rule" "ecs_from_alb" {
  security_group_id            = aws_security_group.ecs.id   
  referenced_security_group_id = aws_security_group.alb.id   
  from_port                    = 80
  to_port                       = 80
  ip_protocol                  = "tcp"
}

# Rule: allow ECS to send traffic out anywhere (e.g. to pull images, call AWS APIs)
resource "aws_vpc_security_group_egress_rule" "ecs_all" {
  security_group_id = aws_security_group.ecs.id
  cidr_ipv4          = "0.0.0.0/0"
  ip_protocol        = "-1"
}

# SECURITY GROUP 3: RDS (Database) allows traffic from ECS to Database
resource "aws_security_group" "rds" {
  name        = "capstone-rds-sg"
  description = "Allow traffic only from ECS"
  vpc_id      = aws_vpc.my-vpc.id
}

# Rule: allow traffic ONLY if it's coming from the ECS security group, "connection" between ECS and RDS
resource "aws_vpc_security_group_ingress_rule" "rds_from_ecs" {
  security_group_id            = aws_security_group.rds.id   
  referenced_security_group_id = aws_security_group.ecs.id   
  from_port                    = 5432                          # 5432 = PostgreSQL's default port
  to_port                       = 5432
  ip_protocol                  = "tcp"
}

# Rule: allow RDS to send traffic out anywhere (usually for updates/patches)
resource "aws_vpc_security_group_egress_rule" "rds_all" {
  security_group_id = aws_security_group.rds.id
  cidr_ipv4          = "0.0.0.0/0"
  ip_protocol        = "-1"
}

# Configure private PostgreSQL 16 database
# RDS SUBNET GROUP, this tells RDS which subnets it can use
resource "aws_db_subnet_group" "main" {
  name       = "capstone-db-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    Name = "capstone-db-subnet-group"
  }
}

# ============================================
# RDS INSTANCE — PostgreSQL 16, private, password auto-managed by AWS
# ============================================

resource "aws_db_instance" "main" {
  identifier                  = "capstone-db"
  engine                      = "postgres"
  engine_version               = "16"
  instance_class                = "db.t3.micro"
  allocated_storage            = 20
  db_name                       = "capstonedb"
  username                      = "capstoneadmin"
  manage_master_user_password  = true
  db_subnet_group_name          = aws_db_subnet_group.main.name
  vpc_security_group_ids        = [aws_security_group.rds.id]
  publicly_accessible           = false
  skip_final_snapshot           = true

  tags = {
    Name = "capstone-db"
  }
}

# Configure ECR REPOSITORIES

# Repository 1: project's 1 website image (WDocker image storage location)
resource "aws_ecr_repository" "website" {
  name = "capstone-website"
}


# Repository 2: Project 2's app image
resource "aws_ecr_repository" "project2_app" {
  name = "capstone-project2-app"
}



#Configure IAM Role
# Assume_role_policy,a trust policy that allows only ECS to pull images from ECR
# IAM: TASK EXECUTION ROLE

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "capstone-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}


# Attach AmazonECSTaskExecutionRolePolicy
resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}


# IAM: TASK ROLE
# Used by a running application/container

resource "aws_iam_role" "ecs_task_role" {
  name = "capstone-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}



# Attach AWS Systems Manager (SSM) policy
resource "aws_iam_role_policy_attachment" "ecs_task_ssm_policy" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}


# CONFIGURE ECS CLUSTER

resource "aws_ecs_cluster" "main" {
  name = "capstone-cluster"
}


# ECS TASK DEFINITION 
resource "aws_ecs_task_definition" "website" {
  family                   = "capstone-website-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn             = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name  = "website"
      image = "${aws_ecr_repository.website.repository_url}:latest"
      portMappings = [
        {
          containerPort = 80
          protocol      = "tcp"
        }
      ]
    }
  ])
}


# ECS SERVICE 

resource "aws_ecs_service" "website" {
  name                   = "capstone-website-service"
  cluster                 = aws_ecs_cluster.main.id
  task_definition         = aws_ecs_task_definition.website.arn
  desired_count           = 1
  launch_type              = "FARGATE"
  enable_execute_command  = true

  network_configuration {
    subnets          = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }


# Target group

  load_balancer {
    target_group_arn = aws_lb_target_group.website.arn
    container_name    = "website"
    container_port    = 80
  }

  depends_on = [aws_lb_listener.http]
}

# APPLICATION LOAD BALANCER

resource "aws_lb" "main" {
  name               = "capstone-alb"
  internal            = false
  load_balancer_type = "application"
  security_groups     = [aws_security_group.alb.id]
  subnets             = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

resource "aws_lb_target_group" "website" {
  name        = "capstone-website-tg"
  port         = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.my-vpc.id
  target_type = "ip"

  health_check {
    path = "/"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port                = 80
  protocol           = "HTTP"

  default_action {
    type              = "forward"
    target_group_arn  = aws_lb_target_group.website.arn
  }
}