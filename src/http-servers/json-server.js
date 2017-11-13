import createHttpServer from './create-http-server'

const product = JSON.stringify({
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [{ color: 'blue' }, { size: 'XL' }]
})

export default createHttpServer('application/json', (request, response) => {
  response.end(product)
})
