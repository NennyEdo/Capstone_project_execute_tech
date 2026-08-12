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