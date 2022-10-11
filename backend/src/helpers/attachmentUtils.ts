import * as AWS from 'aws-sdk'
import { createLogger } from '../utils/logger'

const AWSXRay = require('aws-xray-sdk-core')
const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('attachmentUtils')

// TODO: Implement the fileStogare logic
const bucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = Number(process.env.SIGNED_URL_EXPIRATION)
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
  })

export class AttachmentUtils {
    async getUploadUrl(todoId: string): Promise<string> {
        logger.info('Generating S3 Presigned URL...')
        
        const url = s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: todoId,
            Expires: urlExpiration
        })

        console.log('Generated Signed URL', url)

        return url as string
    }
}
