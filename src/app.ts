import 'dotenv/config'
import express from 'express'
import ticketRoutes from './routes/v1/ticket'
import authRoutes from './routes/v1/auth'
import cors from 'cors'
import env from './utils/validateEnv'
import { authenticateToken } from './utils/authenticateToken'

const clientUri = env.CLIENT_URI
const app = express()
app.use(
  cors({
    origin: [clientUri]
  })
)
app.use(express.json())

app.use('/api/v1/tickets', authenticateToken, ticketRoutes)
app.use('/api/v1/auth', authRoutes)

export default app
