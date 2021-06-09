import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Customer } from '../models/Customer'
import { UpdateCustomerRequest } from 'src/requests/UpdateCustomerRequest';

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

export class CustomerAccess {
    constructor (
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly customersTable = process.env.CUSTOMERS_TABLE
        ){
    }

    async getCustomersByUserId(userId: string): Promise<Customer[]> {
        const items = await this.docClient.query({
            TableName: this.customersTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        return items.Items as Customer[]
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        await this.docClient.put({
            TableName: this.customersTable,
            Item: customer
        }).promise()

        return customer
    }

    async deleteCustomer(customerId: string): Promise<string> {
        console.log('Deleting a todo with id: ', customerId)
        
        await this.docClient.delete({
            TableName: this.customersTable,
            Key: {
                "customerId": customerId
            }
        })
        return customerId
    }

    async updateCustomer(customerId: string, updateCustomerRequest: UpdateCustomerRequest): Promise<UpdateCustomerRequest> {
        console.log(`Updating customer ${customerId}`)
        await this.docClient.update({
            TableName: this.customersTable,
            Key: {
                customerId
            },
            UpdateExpression: 'set customer.notes = :n, customer.name =:m, customer.age = :a',
            ExpressionAttributeValues: {
                ":n": updateCustomerRequest.notes,
                ":m": updateCustomerRequest.name,
                ":a": updateCustomerRequest.age
            }
        })
        return updateCustomerRequest
    }
}