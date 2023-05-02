/* eslint-disable @typescript-eslint/no-misused-promises */
import jwt from 'jsonwebtoken'
import { type UserDocument, UserModel } from '../models/users'

export function authenticateToken(req: any, res: any, next: any): void {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null) {
    return res.sendStatus(401).send()
  }

  jwt.verify(token, 'LSJJA:199299039938', async (err: any, user: any) => {
    if (err !== null) {
      return res.status(401).json({ err })
    }
    const authUser = (await UserModel.findById(user.id).exec()) as UserDocument

    req.user = authUser
    next()
  })
}
