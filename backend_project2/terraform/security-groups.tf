resource "aws_vpc_security_group_ingress_rule" "eks_to_rds" {
  security_group_id            = var.rds_security_group_id
  referenced_security_group_id = module.eks.node_security_group_id

  from_port   = 5432
  to_port     = 5432
  ip_protocol = "tcp"

  description = "Allow Project 2 EKS nodes to access Project 1 RDS"
}