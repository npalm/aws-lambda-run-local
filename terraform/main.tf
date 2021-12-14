locals {
  namespace  = "blog"
  aws_region = "eu-west-1"
}

resource "aws_sqs_queue" "test" {
  name = "${local.namespace}-test"
}

resource "aws_iam_role" "lambda" {
  name               = "${local.namespace}-test"
  path               = "/test/"
  assume_role_policy = data.aws_iam_policy_document.assume.json
}

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
  }
}

resource "aws_iam_role_policy" "sqs" {
  name   = "runner-ssm-session"
  role   = aws_iam_role.lambda.name
  policy = data.aws_iam_policy_document.sqs.json
}

data "aws_iam_policy_document" "sqs" {
  statement {
    actions = [
      "sqs:SendMessage",
      "sqs:GetQueueAttributes"
    ]

    resources = [
      aws_sqs_queue.test.arn,
    ]
  }
}
