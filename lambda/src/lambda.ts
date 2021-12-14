import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Context, ScheduledEvent } from 'aws-lambda';

function getEnvVariable(name: string, defaultValue?: string): string {
  let value = process.env[name];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      console.debug(`Setting default value "${defaultValue}" for environment variable: "${name}"`);
      value = defaultValue;
    } else {
      throw Error(`Environment variable ${name} is not set.`);
    }
  }

  return value || '';
}

export async function handler(event: ScheduledEvent, context: Context): Promise<void> {
  console.log(context.awsRequestId);

  try {
    const client = new SQSClient({});

    const queueUrl = getEnvVariable('QUEUE_URL');
    const message = getEnvVariable('MESSAGE', 'Hello World!');

    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: message,
    });
    console.log(command.input);
    const response = await client.send(command);
    console.log(`Message sent with message id ${response.MessageId}`);
  } catch (e) {
    console.error(e);
  }
}
