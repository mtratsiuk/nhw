import service from './service'

export default service(
  'User',
  ({ dbContext: { Review, User }, authService }) => {
    return {
      getOneByName,
      getAll,
      createOne,
      verifyUser
    }

    function getAll () {
      return User.findAll({
        include: [
          {
            model: Review
          }
        ]
      })
    }

    function getOneByName (name) {
      return User.findOne({ where: { name } })
    }

    async function createOne (data) {
      return User.create({
        ...data,
        id: null,
        password: await authService.hashPassword(data.password)
      })
    }

    async function verifyUser (data) {
      const user = await getOneByName(data.name)

      if (
        user &&
        (await authService.verifyPassword(data.password, user.password))
      ) {
        return user
      }
    }
  }
)
