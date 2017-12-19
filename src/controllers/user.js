import controller from './controller'

export default controller(({ router, baseApi, userService }) => {
  /**
   * @swagger
   *
   * /users/:
   *   get:
   *     tags:
   *     - user
   *     summary: Get all users
   *     description: Get all users
   *     security:
   *     - nhw_token: []
   *     responses:
   *       200:
   *         description: Users array
   *         schema:
   *           type: array
   *           items:
   *             $ref: "#/definitions/User"
   */
  baseApi.getAll(router, userService)

  /**
   * @swagger
   *
   * /users/{userId}:
   *   get:
   *     tags:
   *     - user
   *     summary: Get one users by id
   *     description: Get one users by id
   *     security:
   *     - nhw_token: []
   *     parameters:
   *     - in: path
   *       name: usersId
   *       required: true
   *       type: number
   *     responses:
   *       200:
   *         description: Users
   *         schema:
   *           $ref: "#/definitions/User"
   *       404:
   *         $ref: "#/definitions/NhwError"
   */
  baseApi.getOne(router, userService)
})
