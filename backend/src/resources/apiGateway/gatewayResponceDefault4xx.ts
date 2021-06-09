export default {
    Type: "AWS::ApiGateway::GatewayResponse",
    Properties: {
        ResponseParameters: {
            "gatewayresponse.header.Access-control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization'",
            "gatewayresponse.header.Access-Control-Allow-Methods": "'GET,OPTIONS,POST'"
        },
        ResponseType: "DEFAULT_4XX",
        RestApiId: {
            Ref: 'ApiGatewayRestApi'
        }
    }
}