import { Schema, model, type Document, Types } from 'mongoose'

export interface Permission {
  _id: any
  name: string
}

export type PermissionDocument = Document & Permission

const permissionSchema = new Schema<Permission>({
  name: { type: String, required: true }
})

export const PermissionModel = model<PermissionDocument>(
  'Permission',
  permissionSchema
)

// Define the role schema
export interface Role {
  _id: any
  name: string
  permissions: Types.ObjectId[]
}

export type RoleDocument = Document & Role

const roleSchema = new Schema<Role>({
  name: { type: String, required: true },
  permissions: [{ type: Types.ObjectId, ref: 'Permission' }]
})

export const RoleModel = model<RoleDocument>('Role', roleSchema)
