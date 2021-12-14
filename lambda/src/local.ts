import { handler } from './lambda';
import { event, context } from './test-data';

handler(event, context)
  .then()
  .catch((e) => {
    console.error(e);
  });
