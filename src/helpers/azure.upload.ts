import { unlink } from 'fs'
import { APIError } from '../utils/error.class'
import { blobServiceClient } from '../lib/azure.instance'

export function deleteFile (filePath: string): void {
  unlink(filePath, function (err) {
    if (err != null) {
      console.error(err)
    }
    console.log('Temp File Delete')
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  })
}

export async function uploadImageToAzure (fileName: string, file: any): Promise<string> {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME as string)
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)
    const uploadBlobResponse = await blockBlobClient.uploadFile(file.filepath)
    return uploadBlobResponse._response.request.url
  } catch (err: any) {
    console.error('Erro em uploadImageToAzure', err)
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  }
}

export async function deleteImageFromAzure (fileName: string): Promise<string> {
  try {
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME as string)
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)
    const uploadBlobResponse = await blockBlobClient.deleteIfExists()
    return uploadBlobResponse._response.request.url
  } catch (err: any) {
    console.error('Erro em deleteImageFromAzure', err)
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  }
}
