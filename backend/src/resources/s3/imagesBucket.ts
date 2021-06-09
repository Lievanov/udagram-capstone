export default {
    Type: "AWS::S3::Bucket",
    Properties: {
        BucketName: '${self:provider.environment.IMAGES_S3_BUCKET}',
        CorsConfiguration: {
            CorsRules: [
                { 
                    AllowedOrigins: ["*"],
                    AllowedHeaders: ["*"],
                    AllowedMethods: [
                        "GET",
                        "PUT",
                        "POST",
                        "DELETE",
                        "HEAD"
                    ],
                    MaxAge: 3000
                }
            ]
        }

    }
}