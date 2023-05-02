import app from './app'
import mongoose from 'mongoose'
import { MONGO_CONNECTION_STRING } from './configs/db.config'
import env from './utils/validateEnv'
import { seed } from './scripts/seed'

const port = env.PORT

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(async () => {
    console.log('Mongoose connected')
    await seed()
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch(console.error)
