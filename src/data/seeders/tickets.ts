// let ticketData: Ticket[] = []
import { type TicketDocument, TicketModel } from '../../models/ticket'
import fs from 'fs'

async function seed(): Promise<void> {
  try {
    // Remove all existing roles and permissions
    await TicketModel.deleteMany({})
    let ticketData: TicketDocument[] = []

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fs.readFile('src/data/ticketData.json', 'utf8', async (err, data) => {
      if (err != null) throw err
      ticketData = await JSON.parse(data).ticketData
      // use the ticketData object here
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ticketData.forEach(async (ticket) => {
        try {
          await TicketModel.create(ticket)
        } catch (error) {
          console.error(error)
        }
      })
    })

    console.log('Tickets seeded successfully')
  } catch (error) {
    console.error('Error seeding tickets', error)
  } finally {
    // Close the database connection
    // await connection.close()
  }
}

export { seed as seedTickets }
