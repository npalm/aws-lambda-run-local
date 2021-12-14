import { handler } from './lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { event, context } from './test-data';

const mock = mockClient(SQSClient);

describe('Test lambda.', () => {
  it('Should fail if no queue url is set..', async () => {
    mock.on(SendMessageCommand).resolves({
      MessageId: '',
    });

    await expect(handler(event, context)).rejects;
  });

  it('Should send default message.', async () => {
    mock.on(SendMessageCommand).resolves({
      MessageId: '',
    });
    process.env.QUEUE_URL = 'https://somequeue.url/123';
    await expect(handler(event, context)).resolves;
  });

  it('Should sent provided message.', async () => {
    mock.on(SendMessageCommand).resolves({
      MessageId: '',
    });
    process.env.QUEUE_URL = 'https://somequeue.url/123';
    process.env.MESSAGE = 'test';
    await expect(handler(event, context)).resolves;
  });
});
