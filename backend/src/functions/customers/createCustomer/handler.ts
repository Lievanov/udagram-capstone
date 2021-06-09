import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { createCustomer } from '../../../businessLogic/customers'
import { createLogger } from '../../../utils/logger'
import schema from './schema'
import { CreateCustomerRequest } from 'src/requests/CreateCustomerRequest';

const logger = createLogger('customers')

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const newCustomer: CreateCustomerRequest = event.body
  const userId = '123'
  logger.info(`Create customer for user: ${userId}`)
  logger.info(event)
  const item = await createCustomer(newCustomer, userId)
  return formatJSONResponse({
    item,
  });
}

export const main = middyfy(handler);
