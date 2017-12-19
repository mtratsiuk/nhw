import { BadArgumentsError, NotFoundError } from 'nhw/utils/errors'

import controller from './controller'

export default controller(({ router, userService, authService }) => {
  /**
   * @swagger
   *
   * /auth/signup:
   *   post:
   *     tags:
   *     - auth
   *     - user
   *     description: Register new user
   *     parameters:
   *     - in: body
   *       name: body
   *       required: true
   *       schema:
   *         $ref: "#/definitions/User"
   *     responses:
   *       200:
   *         description: New user created
   *         schema:
   *           type: object
   *           properties:
   *             user:
   *               $ref: "#/definitions/User"
   *             token:
   *               type: string
   *       400:
   *         $ref: "#/definitions/NhwError"
   */
  router.post('/signup', async (req, res, next) => {
    let user = await userService.getOneByName(req.body.name)

    if (user) {
      return next(
        new BadArgumentsError({ message: `Name ${user.name} is already taken` })
      )
    }

    try {
      user = await userService.createOne(req.body)
    } catch (error) {
      next(new BadArgumentsError(error))
    }

    res.json(await getAuthorizedResponse(user))
  })

  /**
   * @swagger
   *
   * /auth/:
   *   post:
   *     tags:
   *     - auth
   *     - user
   *     description: Authorize user
   *     parameters:
   *     - in: body
   *       name: body
   *       required: true
   *       schema:
   *         $ref: "#/definitions/User"
   *     responses:
   *       200:
   *         description: Valid credentials provided
   *         schema:
   *           type: object
   *           properties:
   *             user:
   *               $ref: "#/definitions/User"
   *             token:
   *               type: string
   *       404:
   *         $ref: "#/definitions/NhwError"
   */
  router.post('/', async (req, res, next) => {
    const user = await userService.verifyUser(req.body)

    if (!user) {
      return next(new NotFoundError())
    }

    res.json(await getAuthorizedResponse(user))
  })

  async function getAuthorizedResponse (user) {
    const token = await authService.createJwt(user)

    return { user, token }
  }
})
