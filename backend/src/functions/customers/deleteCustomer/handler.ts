import 'source-map-support/register';

import { formatJSONResponse, formatBadReqResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { deleteCustomer } from '../../../businessLogic/customers'
import { createLogger } from '../../../utils/logger'

const logger = createLogger('customers')

const handler = async (event) => {
  const { customerId } = event.pathParameters
  if(!customerId) {
    formatBadReqResponse({
      message: "Customer not found"
    })
  }
  const userId = '123'
  logger.info(`Delete customer for id: ${customerId} and ${userId}`)
  await deleteCustomer(customerId)
  return formatJSONResponse({
    message: "Customer deleted successfully.",
  });
}

export const main = middyfy(handler);
