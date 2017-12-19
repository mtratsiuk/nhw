import { NotAuthorizedError } from 'nhw/utils/errors'

/**
 * @swagger
 *
 * securityDefinitions:
 *   nhw_token:
 *     type: "apiKey"
 *     name: "x-nhw-token"
 *     in: "header"
 */
export default function auth ({ authService }) {
  const TOKEN_HEADER_NAME = 'x-nhw-token'

  return async function (req, res, next) {
    const token = req.query.token || req.headers[TOKEN_HEADER_NAME]
    try {
      req.user = await authService.verifyJwt(token)
      next()
    } catch (error) {
      next(new NotAuthorizedError(error))
    }
  }
}
