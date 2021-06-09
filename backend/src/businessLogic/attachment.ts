import { AttachmentAccess } from '../dataLayer/attachmentAccess'

const attachmentAccess = new AttachmentAccess();

export async function getUploadUrl(customerId: string, userId: string) {
    return attachmentAccess.getUploadUrl(customerId, userId)
}