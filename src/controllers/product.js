import controller from './controller'

export default controller(
  ({ router, baseApi, productService, reviewService }) => {
    baseApi.getAll(router, productService)

    baseApi.getOne(router, productService)

    baseApi.postOne(router, productService)

    router.get('/:id/reviews', async (req, res) => {
      res.json(await reviewService.getAllByProductId(req.params.id))
    })
  }
)
