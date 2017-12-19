import controller from './controller'

export default controller(({ router, baseApi, cityService }) => {
  /**
   * @swagger
   *
   * /cities/:
   *   get:
   *     tags:
   *     - city
   *     summary: Get all cities
   *     description: Get all cities
   *     security:
   *      - nhw_token: []
   *     responses:
   *       200:
   *         description: Cities array
   *         schema:
   *           type: array
   *           items:
   *             $ref: "#/definitions/City"
   */
  baseApi.getAll(router, cityService)

  /**
   * @swagger
   *
   * /cities/{cityId}:
   *   get:
   *     tags:
   *     - city
   *     summary: Get one city by id
   *     description: Get one city by id
   *     security:
   *      - nhw_token: []
   *     parameters:
   *     - in: path
   *       name: cityId
   *       required: true
   *       type: string
   *     responses:
   *       200:
   *         description: City
   *         schema:
   *           $ref: "#/definitions/City"
   *       404:
   *         $ref: "#/definitions/NhwError"
   */
  baseApi.getOne(router, cityService)

  /**
   * @swagger
   *
   * /cities/:
   *   post:
   *     tags:
   *     - city
   *     summary: Create new city
   *     description: Create new city
   *     security:
   *      - nhw_token: []
   *     parameters:
   *     - in: body
   *       name: body
   *       required: true
   *       schema:
   *         $ref: "#/definitions/City"
   *     responses:
   *       200:
   *         description: City
   *         schema:
   *           $ref: "#/definitions/City"
   *       400:
   *         $ref: "#/definitions/NhwError"
   */
  baseApi.postOne(router, cityService)

  /**
   * @swagger
   *
   * /cities/{cityId}:
   *   put:
   *     tags:
   *     - city
   *     summary: Update city if exist or create new one
   *     description: Update city if exist or create new one
   *     security:
   *      - nhw_token: []
   *     parameters:
   *     - in: path
   *       name: cityId
   *       required: true
   *       type: string
   *     - in: body
   *       name: body
   *       required: true
   *       schema:
   *         $ref: "#/definitions/City"
   *     responses:
   *       200:
   *         description: City
   *         schema:
   *           $ref: "#/definitions/City"
   *       400:
   *         $ref: "#/definitions/NhwError"
   */
  baseApi.putOne(router, cityService)

  /**
   * @swagger
   *
   * /cities/{cityId}:
   *   delete:
   *     tags:
   *     - city
   *     summary: Delete city by id
   *     description: Delete city by id
   *     security:
   *      - nhw_token: []
   *     parameters:
   *     - in: path
   *       name: cityId
   *       required: true
   *       type: string
   *     responses:
   *       204:
   *         description: City
   *         schema:
   *           $ref: "#/definitions/City"
   *       400:
   *         $ref: "#/definitions/NhwError"
   */
  baseApi.deleteOne(router, cityService)
})
