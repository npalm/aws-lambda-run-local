output "test" {
  value = {
    queue_url   = aws_sqs_queue.test.url
    lambda_role = aws_iam_role.lambda.arn
  }
}
