export default {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
        PolicyDocument: {
            Id: "MyPolicy",
            Version: "2012-10-17",
            Statement: [{
                Sid: "PublicReadForGetBucketObjects",
                Effect: "Allow",
                Principal: "*",
                Action: "s3:GetObject",
                Resource: "arn:aws:s3:::${self:provider.environment.IMAGES_S3_BUCKET}/*"
            }]
        },
        Bucket: { Ref: "ImagesBucket" }
    }
}