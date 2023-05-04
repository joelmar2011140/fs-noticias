import { BlobServiceClient } from '@azure/storage-blob'

export const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING_BLOB as string)
