import 'source-map-support/register';

import { formatJSONResponse, formatBadReqResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getUploadUrl } from '../../businessLogic/attachment'
import { createLogger } from '../../utils/logger'

const logger = createLogger('customers')

const handler = async (event) => {
  const { customerId } = event.pathParameters
  const userId = '123'
  if(!customerId) {
    formatBadReqResponse({
      message: "Customer not found"
    })
  }
  logger.info(`Get list of users for id: ${userId}`)
  const url = await getUploadUrl(customerId, userId)
  return formatJSONResponse({
    uploadUrl: url,
  });
}

export const main = middyfy(handler);
