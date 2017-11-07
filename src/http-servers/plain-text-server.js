import createHttpServer from './create-http-server'

export default createHttpServer('text/plain', (request, response) => {
  response.end('Hello World')
})
