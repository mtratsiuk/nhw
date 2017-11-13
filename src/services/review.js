import service from './service'

const source = [
  {
    id: 1,
    productId: 1,
    userId: 2,
    text: 'Nice one'
  },
  {
    id: 2,
    productId: 1,
    userId: 1,
    text: 'Cool!'
  }
]

export default service(source, () => {
  return {
    getAllByProductId
  }

  async function getAllByProductId (id) {
    return source.filter(x => x.productId === +id)
  }
})
