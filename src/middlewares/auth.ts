import { type NextFunction, type Response } from 'express'
import { APIError } from '../utils/error.class'
import JWT from 'jsonwebtoken'
import { prismaUser } from '../users/users.prisma'
import { prismaClient } from '../lib/prisma.client'

// Auth para admins
export async function authAdmin (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    if (req.headers.authorization == null) {
      return res.sendStatus(403)
    }
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (token == null) {
      return res.sendStatus(403)
    }
    const payload = JWT.verify(token as string, process.env.JWT_KEY as string)
    if (payload == null) {
      return res.sendStatus(403)
    }
    const usuario = await prismaUser.findUnique({ where: { userId: payload.sub as string } })
    if (usuario == null) {
      return res.sendStatus(403)
    }
    if (usuario?.papel !== 'ADMIN') {
      return res.sendStatus(403)
    }
    const { senha, ...rest } = usuario as any
    req.user = rest
    next()
  } catch (err: any) {
    console.log(err)
    console.log('Erro em authAdmin', err)
    next(new APIError('APIERROR', 'Acesso negado', 403))
  }
}
// Auth para publicadores
export async function authPublicador (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    if (req.headers.authorization == null) {
      return res.sendStatus(403)
    }
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (token == null) {
      return res.sendStatus(403)
    }
    const payload = JWT.verify(token as string, process.env.JWT_KEY as string)
    if (payload == null) {
      return res.sendStatus(403)
    }
    const usuario = await prismaUser.findUnique({ where: { userId: payload.sub as string } })
    if (usuario == null) {
      return res.sendStatus(403)
    }
    if (usuario?.papel !== 'PUBLICADOR') {
      return res.sendStatus(403)
    }
    const { senha, ...rest } = usuario as any
    req.user = rest
    next()
  } catch (err: any) {
    console.log(err)
    console.log('Erro em authPublicador', err)
    next(new APIError('APIERROR', 'Acesso negado', 403))
  }
}

// Auth Normal
export async function authUser (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    if (req.headers.authorization == null) {
      return res.sendStatus(403)
    }
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (token == null) {
      return res.sendStatus(403)
    }
    const payload = JWT.verify(token as string, process.env.JWT_KEY as string)
    if (payload == null) {
      return res.sendStatus(403)
    }
    const usuario = await prismaUser.findUnique({ where: { userId: payload.sub as string } })
    if (usuario == null) {
      return res.sendStatus(403)
    }
    const { senha, ...rest } = usuario as any
    req.user = rest
    next()
  } catch (err: any) {
    console.log(err)
    console.log('Erro em authUser', err)
    next(new APIError('APIERROR', 'Acesso negado', 403))
  }
}

export async function authAPI (req: any, res: Response, next: NextFunction): Promise<any> {
  try {
    if (req.headers.authorization == null) {
      return res.sendStatus(403)
    }
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (token == null) {
      return res.sendStatus(403)
    }
    const userKey = await prismaClient.userKeys.findUnique({ where: { key: token } })
    if (userKey == null) {
      return res.sendStatus(403)
    }
    next()
  } catch (err: any) {
    console.log(err)
    console.log('Erro em authUser', err)
    next(new APIError('APIERROR', 'Acesso negado', 403))
  }
}
