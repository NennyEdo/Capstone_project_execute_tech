module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = "capstone-eks"
  kubernetes_version = "1.31"

  vpc_id     = aws_vpc.my-vpc.id
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  endpoint_public_access  = true
  endpoint_private_access = true

  addons = {
    coredns = {}
    kube-proxy = {}
    vpc-cni = {
      before_compute = true
    }
  }

  enable_cluster_creator_admin_permissions = true

  eks_managed_node_groups = {
    default = {
      min_size       = 2
      max_size       = 2
      desired_size   = 2
      instance_types = ["t3.small"]
    }
  }
}