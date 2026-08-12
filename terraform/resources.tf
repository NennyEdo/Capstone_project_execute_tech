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