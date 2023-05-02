import { cleanEnv } from 'envalid'
import { port, str, url } from 'envalid/dist/validators'

export default cleanEnv(process.env, {
  PORT: port(),
  SOCKET_PORT: port(),
  MONGO_CONNECTION_STRING: str(),
  CLIENT_URI: url(),
  PUSHER_APP_ID: str(),
  PUSHER_KEY: str(),
  PUSHER_SECRET: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str()
})
