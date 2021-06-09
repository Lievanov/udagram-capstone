import type { AWS } from '@serverless/typescript';

import getCustomersByUserId from '@functions/customers/getCustomersByUserId'
import createCustomer from '@functions/customers/createCustomer'
import deleteCustomer from '@functions/customers/deleteCustomer'
import updateCustomer from '@functions/customers/updateCustomer'

import getUploadUrl from '@functions/attachments'

import CustomersTable from '@resources/dynamodb/customersTable'

import ImagesBucket from '@resources/s3/imagesBucket'
import bucketPolicy from '@resources/s3/bucketPolicy'

import gatewayResponseDefault4xx from '@resources/apiGateway/gatewayResponceDefault4xx'

const serverlessConfiguration: AWS = {
  service: 'customers',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-iam-roles-per-function'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    tracing: { 
      lambda: true, 
      apiGateway: true
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    stage: "${opt:stage, 'dev'}",
    region: "us-east-1",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      CUSTOMERS_TABLE: "Customers-${self:provider.stage}",
      IMAGES_S3_BUCKET: "images-270184201910-${self:provider.stage}",
      SIGNED_URL_EXPIRATION: "300"
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    getCustomersByUserId,
    createCustomer,
    deleteCustomer,
    updateCustomer,
    getUploadUrl
  },
  resources: {
    Resources: {
      CustomersTable,
      ImagesBucket,
      bucketPolicy,
      gatewayResponseDefault4xx
    }
  }
};

module.exports = serverlessConfiguration;
