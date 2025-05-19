import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


const secret = 'mySecretKey'  //jwt passcode


export const userRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string     
    }
  }>();
  

  userRoute.post('/signup', async (c) => {
    {console.log("hello");
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  console.log("hello1111");   
    
  
    const body = await c.req.json();
    try {     
  
      const user = await prisma.user.create({    
        data: {
          email: body.username,
          name: body.name,
          password: body.password,
        },
      })
      
  
      const token = await sign({id:user.id}, secret);
  
      return c.json({
        jwt:token
      });
  
    }
    catch (e) {
      return c.status(403);
    }
  
  })
  userRoute.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body= await c.req.json()
    
    const user=await prisma.user.findUnique({
      where:{
        email:body.username,
        password:body.password,
      },
    })
  
    if(user){
      const token=await sign({id:user.id},secret)
  
      return c.json({
        jwt:token
      })
        }
  
    else{
      return c.status(403)
    } 
  })
  
  