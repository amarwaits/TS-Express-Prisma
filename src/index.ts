import { PrismaClient } from '@prisma/client'
import express from 'express'
// import { useExpressServer } from 'routing-controllers';
// import gracefulShutdown from 'http-graceful-shutdown';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post(`/user`, async (req, res) => {
  let { name, email, age } = req.body

  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        age
      },
    })
    res.json(result)
  } catch (err: any) {
    res.json({ error: `Can not add user. Error: ${err.message || err.sqlMessage || err}` })
  }
})

app.get(`/user/:id`, async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findFirstOrThrow({ where: { id: Number(id) } })
    res.json(user)
  } catch (error) {
    res.json({ error: `User with ID ${id} does not exist in the database` })
  }
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)






// import Logger from './logger';
// import { ObjectUtils } from './utils';
// import * as controllers from './controllers';
// import * as middlewares from './middlewares';

// process.on('uncaughtException', Logger.error);
// process.on('unhandledRejection', Logger.error);

// const start = async () => {
//   const app: Express.Application = Express()

//   useExpressServer(app, {
//     controllers: <Function[]>ObjectUtils.getObjectValues(controllers),
//     defaultErrorHandler: false,
//     defaults: {
//       nullResultCode: 404,
//       paramOptions: {
//         required: true,
//       },
//       undefinedResultCode: 404,
//     },
//     middlewares: <Function[]>ObjectUtils.getObjectValues(middlewares),
//     routePrefix: '/api',
//   });

//   const server = app.listen(8080, () => {
//     Logger.info(`Server up and running on port 8080`);
//   });

//   gracefulShutdown(server);
// };

// start();