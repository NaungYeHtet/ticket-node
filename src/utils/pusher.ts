import Pusher from 'pusher'
import env from './validateEnv'

const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: 'ap1'
})

export default pusher
