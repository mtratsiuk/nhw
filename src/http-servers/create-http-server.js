import http from 'http'

export default (contentType, listener) => {
  return (...args) => {
    const server = http.createServer((request, response) => {
      response.setHeader('Content-Type', contentType)
      listener(request, response)
    })

    server.listen(...args)
    console.log('Server is listening:', contentType, ...args)

    return server
  }
}
