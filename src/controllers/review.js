import controller from './controller'

export default controller(({ router, baseApi, reviewService }) => {
  /**
   * @swagger
   *
   * /reviews/:
   *   get:
   *     tags:
   *     - review
   *     summary: Get all reviews
   *     description: Get all reviews
   *     security:
   *     - nhw_token: []
   *     responses:
   *       200:
   *         description: Reviews array
   *         schema:
   *           type: array
   *           items:
   *             $ref: "#/definitions/Review"
   */
  baseApi.getAll(router, reviewService)

  /**
   * @swagger
   *
   * /reviews/{reviewId}:
   *   get:
   *     tags:
   *     - review
   *     summary: Get one review by id
   *     description: Get one review by id
   *     security:
   *     - nhw_token: []
   *     parameters:
   *     - in: path
   *       name: reviewId
   *       required: true
   *       type: number
   *     responses:
   *       200:
   *         description: Review
   *         schema:
   *           $ref: "#/definitions/Review"
   *       404:
   *         $ref: "#/definitions/NhwError"
   */
  baseApi.getOne(router, reviewService)

  /**
   * @swagger
   *
   * /reviews/:
   *   post:
   *     tags:
   *     - review
   *     summary: Create new review
   *     description: Create new review
   *     security:
   *     - nhw_token: []
   *     parameters:
   *     - in: body
   *       name: body
   *       required: true
   *       schema:
   *         $ref: "#/definitions/Review"
   *     responses:
   *       200:
   *         description: Review
   *         schema:
   *           $ref: "#/definitions/Review"
   *       400:
   *         $ref: "#/definitions/NhwError"
   */
  baseApi.postOne(router, reviewService)
})
