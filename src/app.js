import express from 'express'
import bodyParser from 'body-parser'

import * as middlewares from 'nhw/middlewares'
import * as controllers from 'nhw/controllers'
import * as services from 'nhw/services'

export default async function ({ port = process.env.NHW_PORT } = {}) {
  const app = express()

  app.use(middlewares.cookieParser())
  app.use(middlewares.queryParser())
  app.use(bodyParser.json())

  const dbContext = await services.createDbContext()
  const userService = services.user({ dbContext })
  const productService = services.product({ dbContext })
  const reviewService = services.review({ dbContext })

  app.use('/products', controllers.product({ productService, reviewService }))
  app.use('/users', controllers.user({ userService }))
  app.use('/reviews', controllers.review({ reviewService }))

  app.use(middlewares.errorHandler())

  app.listen(port, () => console.log(`App listening on port ${port}`))

  return app
}
