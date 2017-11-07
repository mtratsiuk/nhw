import controller from './controller'

export default controller(({ router, userService }) => {
  router.get('/', async (req, res) => {
    res.json(await userService.getAll())
  })
})
