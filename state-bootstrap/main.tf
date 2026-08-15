terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# Configure AWS Provider
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