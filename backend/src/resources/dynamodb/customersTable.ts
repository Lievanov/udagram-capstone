export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        AttributeDefinitions: [
        { AttributeName: "userId", AttributeType: "S" },
        { AttributeName: "customerId", AttributeType: "S" },
        ],
        KeySchema: [
        { AttributeName: "userId", KeyType: "HASH" },
        { AttributeName: "customerId", KeyType: "RANGE" }
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: "${self:provider.environment.CUSTOMERS_TABLE}"
    }
}