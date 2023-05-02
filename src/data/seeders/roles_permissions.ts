import { PermissionModel, RoleModel } from '../../models/role_permissions'

const roles = [
  {
    name: 'Staff',
    permissions: ['create ticket', 'update ticket']
  },
  {
    name: 'Supervisor',
    permissions: ['list ticket', 'approve ticket']
  },
  {
    name: 'Leader',
    permissions: ['list ticket', 'delete ticket', 'approve ticket']
  }
]

const permissions = [
  { name: 'list ticket' },
  { name: 'create ticket' },
  { name: 'update ticket' },
  { name: 'delete ticket' },
  { name: 'approve ticket' }
]

async function seed(): Promise<void> {
  try {
    // Remove all existing roles and permissions
    await RoleModel.deleteMany({})
    await PermissionModel.deleteMany({})

    // Seed permissions
    const createdPermissions = await PermissionModel.create(permissions)

    // Seed roles with associated permissions
    await RoleModel.create(
      roles.map((role) => ({
        name: role.name,
        permissions: createdPermissions
          .filter((permission) => role.permissions.includes(permission.name))
          .map((permission) => permission._id)
      }))
    )

    console.log('Roles and permissions seeded successfully')
  } catch (error) {
    console.error('Error seeding roles and permissions', error)
  } finally {
    // Close the database connection
    // await connection.close()
  }
}

export { seed as seedRolesPermissions }
