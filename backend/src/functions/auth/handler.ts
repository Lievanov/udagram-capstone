import 'source-map-support/register';

import { verify, decode } from 'jsonwebtoken'
import { middyfy } from '@libs/lambda';

import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

const jwksUrl = 'https://akaput.us.auth0.com/.well-known/jwks.json'

const handler = async (event) => {

  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)
    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: '*'
        }]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { erro: e.message })
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  console.log("Decoded jwt: ",jwt)
  try {
    const res = await Axios.get(jwksUrl)
    const matchedKey = res.data.keys?.find(k => k.kid === jwt.header.kid)
    const { x5c } = matchedKey;
    const cert = `-----BEGIN CERTIFICATE-----\n${x5c[0]}\n-----END CERTIFICATE-----`;
    const verifiedToken = verify(token, cert, {algorithms:['RS256']})
    return verifiedToken as JwtPayload
  } catch (e) {
    console.log(e)
  }
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

export const main = middyfy(handler);
