import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse, formatBadReqResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { updateCustomer } from '../../../businessLogic/customers'
import { createLogger } from '../../../utils/logger'
import schema from './schema'
import { UpdateCustomerRequest } from '../../../requests/UpdateCustomerRequest';

const logger = createLogger('customers')

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { customerId } = event.pathParameters
  if(!customerId) {
    formatBadReqResponse({
      message: "Customer not found"
    })
  }
  // @ts-ignore
  const updatedCustomer: UpdateCustomerRequest = event.body
  const userId = '123'
  logger.info(`Create customer for user: ${userId}`)
  logger.info(event)
  const item = await updateCustomer(updatedCustomer, customerId)
  return formatJSONResponse({
    item,
  });
}

export const main = middyfy(handler);
