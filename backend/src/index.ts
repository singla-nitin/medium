import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { userRoute } from '../routes/user'
import { blogRoute } from '../routes/blog'
import { cors } from 'hono/cors'


const secret = 'mySecretKey'  //jwt passcode

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
   
  }
}>();



app.use('/api/*', cors())
app.route("/api/v1/user",userRoute)
app.route("api/v1/blog",blogRoute)


app.get('/', (c) => {
  return c.text('Hello Hono!')
})






export default app
