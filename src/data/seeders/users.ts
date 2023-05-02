// let ticketData: Ticket[] = []
import fs from 'fs'
import { type UserDocument, UserModel } from '../../models/users'
import { type RoleDocument, RoleModel } from '../../models/role_permissions'

async function seed(): Promise<void> {
  try {
    // Remove all existing roles and permissions
    await UserModel.deleteMany({})
    let userData: UserDocument[] = []

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fs.readFile('src/data/userData.json', 'utf8', async (err, data) => {
      if (err != null) throw err
      userData = await JSON.parse(data).staffData
      // use the userData object here
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      userData.forEach(async (user) => {
        try {
          const staffRole = (await RoleModel.findOne({
            name: 'Staff'
          })) as unknown as RoleDocument

          console.log('STAFF ROLE >>>>>>>>>> ', staffRole)
          await UserModel.create({ ...user, roleId: staffRole._id })
        } catch (error) {
          console.error(error)
        }
      })

      userData = await JSON.parse(data).leaderData
      // use the userData object here
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      userData.forEach(async (user) => {
        try {
          const leaderRole = (await RoleModel.findOne({
            name: 'Leader'
          })) as unknown as RoleDocument

          console.log('Leader ROLE >>>>>>>>>> ', leaderRole)
          await UserModel.create({ ...user, roleId: leaderRole._id })
        } catch (error) {
          console.error(error)
        }
      })

      userData = await JSON.parse(data).supervisorData
      // use the userData object here
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      userData.forEach(async (user) => {
        try {
          const supervisorRole = (await RoleModel.findOne({
            name: 'Supervisor'
          })) as unknown as RoleDocument

          console.log('Supervisor ROLE >>>>>>>>>> ', supervisorRole)
          await UserModel.create({ ...user, roleId: supervisorRole._id })
        } catch (error) {
          console.error(error)
        }
      })
    })

    console.log('User seeded successfully')
  } catch (error) {
    console.error('Error seeding users', error)
  } finally {
    // Close the database connection
    // await connection.close()
  }
}

export { seed as seedUsers }
