import { unlink } from 'fs'
import { APIError } from '../utils/error.class'

export function deleteFile (filePath: string): void {
  unlink(filePath, function (err) {
    if (err != null) {
      console.error(err)
    }
    console.log('Temp File Delete')
    throw new APIError('SERVER_ERROR', 'Aconteceu um erro inesperado no servidor, tente mais tarde , caso o erro persistir contacte a equipa de suporte', 503)
  })
}
