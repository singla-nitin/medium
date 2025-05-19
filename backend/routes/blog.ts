import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { parse } from 'hono/utils/cookie'

const secret = 'mySecretKey'  //jwt passcode

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string

    }
}>();

blogRoute.use('/*', async (c, next) => {
    const header =  c.req.header("Authorization") || ""
    const token= header     //.split(" ")[1]
    const response= await verify(token,secret)
    if(!response){
         c.status(401)
         return c.json({
            message:"UNAUTHORIZED"
         })
    }
    const userid=response.id   
    c.set('jwtPayload',userid)
      await next()  
  })
////////////////////////////////////////////////post new blog/////////////
blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body= await c.req.json()
    const id=c.get('jwtPayload')
    console.log(id);
    
    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:id
        },
    })

    return c.json(blog)
})
////////////////////////////////////////////////update existing blog
blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body= await c.req.json()

      const updatePost=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
      })

    return c.text("update post")
})

// blogRoute.get('/id', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//       }).$extends(withAccelerate())
//       const id=c.get('jwtPayload')
    
//     const post= await prisma.post.findMany({
//         where:{
//             authorId:id
//         },
//     })

//     return c.json({
//         post,
//     })


    
// })



//paging
blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
     
    
    const post= await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true,
                }
            }
        }
    })

    return c.json({
        post,
    })

  
})

blogRoute.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true,
                }
            }
        }
	});

	return c.json(post);
})

