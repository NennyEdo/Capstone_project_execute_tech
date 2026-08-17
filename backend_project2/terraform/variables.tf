variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-north-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "capstone"
}

variable "vpc_id" {
  description = "VPC ID to use for EKS. Reusing the Project 1 VPC."
  type        = string
  default     = "vpc-02dc4b397239bfad7"
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for EKS nodes."
  type        = list(string)
  default     = ["subnet-0b3c34e5eda7c154d", "subnet-0dbbb72f76f0387c2"]
}

variable "public_subnet_ids" {
  description = "Public subnet IDs for the EKS load balancer."
  type        = list(string)
  default     = ["subnet-0c365dddb981db80b", "subnet-0eb76e6a1ca5ea1ad"]
}

variable "rds_security_group_id" {
  description = "Security group ID attached to the Project 1 RDS instance."
  type        = string
  default     = "sg-0461c871b9b3878bb"
}