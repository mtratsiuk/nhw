import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import * as middlewares from 'nhw/middlewares'
import * as controllers from 'nhw/controllers'
import * as services from 'nhw/services'

export default async function ({ port = process.env.NHW_PORT } = {}) {
  const app = express()

  app.use(middlewares.cookieParser())
  app.use(middlewares.queryParser())
  app.use(bodyParser.json())

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJsDoc({
        swaggerDefinition: {
          info: {
            title: 'NHW - Api',
            version: require('../package.json').version
          }
        },
        apis: ['./src/**/*.js']
      })
    )
  )

  const ctx = {}
  ctx.dbContext = await services.createDbContext()
  ctx.authService = services.auth()
  ctx.userService = services.user(ctx)
  ctx.productService = services.product(ctx)
  ctx.reviewService = services.review(ctx)
  ctx.cityService = services.city(ctx)

  app.use('/auth', controllers.auth(ctx))

  app.use(middlewares.auth(ctx))

  app.use('/products', controllers.product(ctx))
  app.use('/users', controllers.user(ctx))
  app.use('/reviews', controllers.review(ctx))
  app.use('/cities', controllers.city(ctx))

  app.use((req, res) => res.status(404).end())
  app.use(middlewares.errorHandler())

  app.listen(port, () => console.log(`App listening on port ${port}`))

  return app
}
