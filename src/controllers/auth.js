import { BadArgumentsError, NotFoundError } from 'nhw/utils/errors'

import controller from './controller'

export default controller(({ router, userService, authService }) => {
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
