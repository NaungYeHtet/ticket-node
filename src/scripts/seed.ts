// import { connection } from 'mongoose'

import { seedRolesPermissions } from '../data/seeders/roles_permissions'
import { seedTickets } from '../data/seeders/tickets'
import { seedUsers } from '../data/seeders/users'

export async function seed(): Promise<void> {
  await seedRolesPermissions()
  await seedTickets()
  await seedUsers()
}
