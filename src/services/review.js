import service from './service'

export default service('Review', ({ Review }) => {
  return {
    getAllByProductId
  }

  async function getAllByProductId (id) {
    return Review.findAll({
      where: {
        productId: id
      }
    })
  }
})
