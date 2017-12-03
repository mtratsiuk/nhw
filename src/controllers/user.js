import controller from './controller'

export default controller(({ router, baseApi, userService }) => {
  baseApi.getAll(router, userService)

  baseApi.getOne(router, userService)
})
