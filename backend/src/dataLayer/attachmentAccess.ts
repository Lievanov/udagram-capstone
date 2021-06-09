import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

export class AttachmentAccess {
  constructor (
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly customersTable = process.env.CUSTOMERS_TABLE,
    private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION),
    private readonly s3 = new AWS.S3({
      signatureVersion: 'v4'
    })
  ){}

  async getUploadUrl(customerId: string, userId: string) {
    console.log(`Generating URL with customerId ${customerId} and userId: ${userId}`)
    const generatedUrl = this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: customerId,
      Expires: this.urlExpiration
    })
    await this.docClient.update({
      TableName: this.customersTable,
      Key: { userId, customerId },
      UpdateExpression: "set attachmentUrl=:URL",
      ExpressionAttributeValues: {
        ":URL": generatedUrl.split("?")[0]
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()

    return generatedUrl

  }
}