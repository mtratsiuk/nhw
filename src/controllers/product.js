import controller from './controller'

export default controller(
  ({ router, baseApi, productService, reviewService }) => {
    /**
    * @swagger
    *
    * /products/:
    *   get:
    *     tags:
    *     - product
    *     summary: Get all products
    *     description: Get all products
    *     security:
    *     - nhw_token: []
    *     responses:
    *       200:
    *         description: Products array
    *         schema:
    *           type: array
    *           items:
    *             $ref: "#/definitions/Product"
    */
    baseApi.getAll(router, productService)

    /**
    * @swagger
    *
    * /products/{productId}:
    *   get:
    *     tags:
    *     - product
    *     summary: Get one product by id
    *     description: Get one product by id
    *     security:
    *     - nhw_token: []
    *     parameters:
    *     - in: path
    *       name: productId
    *       required: true
    *       type: number
    *     responses:
    *       200:
    *         description: Product
    *         schema:
    *           $ref: "#/definitions/Product"
    *       404:
    *         $ref: "#/definitions/NhwError"
    */
    baseApi.getOne(router, productService)

    /**
    * @swagger
    *
    * /products/:
    *   post:
    *     tags:
    *     - product
    *     summary: Create new product
    *     description: Create new product
    *     security:
    *     - nhw_token: []
    *     parameters:
    *     - in: body
    *       name: body
    *       required: true
    *       schema:
    *         $ref: "#/definitions/Product"
    *     responses:
    *       200:
    *         description: Product
    *         schema:
    *           $ref: "#/definitions/Product"
    *       400:
    *         $ref: "#/definitions/NhwError"
    */
    baseApi.postOne(router, productService)

    /**
    * @swagger
    *
    * /products/{productId}/reviews:
    *   post:
    *     tags:
    *     - product
    *     - review
    *     summary: Get all reviews by product id
    *     description: Get all reviews by product id
    *     security:
    *     - nhw_token: []
    *     parameters:
    *     - in: path
    *       name: productId
    *       required: true
    *       type: number
    *     responses:
    *       200:
    *         description: Reviews
    *         schema:
    *           type: array
    *           items:
    *             $ref: "#/definitions/Review"
    *       400:
    *         $ref: "#/definitions/NhwError"
    */
    router.get('/:id/reviews', async (req, res) => {
      res.json(await reviewService.getAllByProductId(req.params.id))
    })
  }
)
