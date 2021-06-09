import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getCustomersByUserId } from '../../../businessLogic/customers'
import { createLogger } from '../../../utils/logger'

const logger = createLogger('customers')

const handler = async (event) => {
  const userId = '123'
  logger.info(`Get list of users for id: ${userId}`)
  logger.info(event)
  const items = await getCustomersByUserId(userId)
  return formatJSONResponse({
    items,
  });
}

export const main = middyfy(handler);
