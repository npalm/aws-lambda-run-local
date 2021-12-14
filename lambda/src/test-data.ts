import { ScheduledEvent } from 'aws-lambda';
import { Context } from 'aws-lambda';

// generated with sam local generate-event cloudwatch scheduled-event
// mismatch with ScheduledEvent from @types/aws-lambda, version field was missing
export const event: ScheduledEvent = {
  id: 'cdc73f9d-aea9-11e3-9d5a-835b769c0d9c',
  'detail-type': 'Scheduled Event',
  source: 'aws.events',
  account: '123456789012',
  time: '1970-01-01T00:00:00Z',
  region: 'us-east-1',
  resources: ['arn:aws:events:us-east-1:123456789012:rule/ExampleRule'],
  detail: {},
  version: '1',
};

export const context: Context = {
  awsRequestId: 'request-1',
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'Test',
  functionVersion: '$Default',
  getRemainingTimeInMillis: () => 1,
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '0',
  done: () => ({}),
  fail: () => ({}),
  succeed: () => ({}),
};
