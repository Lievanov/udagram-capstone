import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'customers/{customerId}/attachment'
      }
    }
  ],
  iamRoleStatements: [
    {
        Effect: "Allow",
        Action: [
          "s3:PutObject",
          "s3:GetObject"
        ],
        Resource: "arn:aws:s3:::${self:provider.environment.IMAGES_S3_BUCKET}/*"
    },
    {
      Effect: "Allow",
      Action: [
        "dynamodb:getItem",
        "dynamodb:UpdateItem"
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CUSTOMERS_TABLE}"
    }
  ]
}
