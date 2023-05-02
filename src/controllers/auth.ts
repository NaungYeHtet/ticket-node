/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextFunction, RequestHandler, Response } from 'express'
import UserModel, { type UserDocument } from '../models/users'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { env } from 'process'
import { type RoleDocument, RoleModel } from '../models/role_permissions'

interface RegisterBody {
  name?: string
  email?: string
  password?: string
}

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email })
    if (existingUser !== null) {
      return res.status(409).json({ message: 'User already exists' })
    }

    if (password === undefined) {
      return res.status(400)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const staffRole = (await RoleModel.findOne({
      name: 'Staff'
    })) as unknown as RoleDocument

    // Create new user
    const user = new UserModel({
      email,
      password: hashedPassword,
      roleId: staffRole._id
    })
    await user.save()

    // Generate a JWT token with the user id as the payload
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET ?? '', {
      expiresIn: env.JWT_EXPIRES_IN
    })

    // Return the token to the client
    return res.json({ token, user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

interface LoginRequestBody {
  email?: string
  password?: string
}
export const login: RequestHandler<
  unknown,
  unknown,
  LoginRequestBody,
  unknown
> = async (req, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  // Find the user by email
  const user: UserDocument | null = await UserModel.findOne({ email })

  if (user == null) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  if (password === undefined) {
    return res.status(400)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  // Generate a JWT token with the user id as the payload
  const token = jwt.sign({ id: user.id }, env.JWT_SECRET ?? '', {
    expiresIn: env.JWT_EXPIRES_IN
  })

  // Return the token to the client
  return res.json({ token, user })
}

export const logout: RequestHandler = async (
  req,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token == null) {
    return res.status(401)
  }

  // Return the token to the client
  return res.status(200).json()
}
