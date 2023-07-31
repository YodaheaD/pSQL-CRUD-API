import PusherClient from 'pusher-js'
import PusherServer from 'pusher'
import dotenv from 'dotenv'

dotenv.config()
 

export const pusherServer = new PusherServer({
   appId:'1629668', //String(process.env.NEXT_PUBLIC_PUSHER_ID),
    key:'5f7f9fbdb1d0f83773ed', //String(process.env.NEXT_PUBLIC_PUSHER_KEY),
    secret:'19239ea4f72e81c6e01e',// String(process.env.NEXT_PUBLIC_PUSHER_SECRET),
    cluster: 'us2',
    useTLS: true
  }) 
  
  export const pusherClient = new PusherClient(
    '5f7f9fbdb1d0f83773ed',
    {cluster: 'us2'})