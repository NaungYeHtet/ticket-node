/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ObjectId } from 'mongodb'
import {
  type Role,
  RoleModel,
  type Permission,
  PermissionModel
} from '../models/role_permissions'
import { type RequestHandler, type NextFunction, type Response } from 'express'
// import { type UserDocument, UserModel } from '../models/users'

export async function getRole(id: ObjectId): Promise<Role | null> {
  const role = await RoleModel.findOne({ _id: id })
  return role
}

export async function getPermission(name: string): Promise<Permission | null> {
  const permission = await PermissionModel.findOne({ name })
  return permission
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    roleId: string
    // add more properties as needed
  }
}

export function authorize(roleId: string) {
  return function (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    if (req.user == null || req.user.roleId !== roleId) {
      return res.status(403).send('Unauthorized')
    }
    next()
  }
}

export const can = (
  permissionName: string
): RequestHandler<Record<string, any>, any, any, any, AuthenticatedRequest> => {
  return async (req, res, next) => {
    const typedRequest = req as unknown as AuthenticatedRequest

    const userRole = await RoleModel.findById(typedRequest.user?.roleId).exec()
    if (userRole == null) {
      return res.status(403).send('Unauthorized')
    }
    const permission = await getPermission(permissionName)

    if (
      permission == null ||
      !userRole.permissions.some((p) => p._id.equals(permission._id))
    ) {
      return res.status(403).send('Forbidden')
    }
    next()
  }
}
