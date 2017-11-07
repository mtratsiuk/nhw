import express from 'express'
import bodyParser from 'body-parser'

import * as middlewares from 'nhw/middlewares'
import * as controllers from 'nhw/controllers'
import * as services from 'nhw/services'

const app = express()

app.use(middlewares.cookieParser())
app.use(middlewares.queryParser())
app.use(bodyParser.json())

const userService = services.user()
const productService = services.product()
const reviewService = services.review()

app.use('/products', controllers.product({ productService, reviewService }))
app.use('/users', controllers.user({ userService }))

export default app
