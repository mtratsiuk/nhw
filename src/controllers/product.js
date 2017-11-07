import controller from './controller'

export default controller(({ router, productService, reviewService }) => {
  router.get('/', async (req, res) => {
    res.json(await productService.getAll())
  })

  router.get('/:id', async (req, res) => {
    const product = await productService.getById(req.params.id)

    if (product) {
      return res.json(product)
    }

    res.status(404).end()
  })

  router.get('/:id/reviews', async (req, res) => {
    res.json(await reviewService.getAllByProductId(req.params.id))
  })

  router.post('/', async (req, res) => {
    const product = await productService.createOne(req.body)

    if (product) {
      return res.json(product)
    }

    res.status(400).end()
  })
})
