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

# Add Internet Gateway 
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my-vpc.id

  tags = {
    Name = "capstone-igw"
  }
}

# Public route table 
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

# Associate public route table with both public subnets
resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

# Elastic IP for the NAT Gateway
resource "aws_eip" "nat" {
  domain = "vpc"

  tags = {
    Name = "capstone-nat-eip"
  }
}

# NAT Gateway — sits in a public subnet, lets private subnets reach the internet
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_a.id

  tags = {
    Name = "capstone-nat"
  }

  depends_on = [aws_internet_gateway.igw]
}

# Private route table — routes private subnet traffic through the NAT Gateway
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

# Associate private route table with both private subnets
resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_b.id
  route_table_id = aws_route_table.private.id
}