import fs from 'fs'
import path from 'path'
import mishtache from 'nhw/utils/mishtache'
import createHttpServer from './create-http-server'

const template = path.resolve(__dirname, '../../data/index.html')
const render = mishtache()

export default createHttpServer('text/html', (request, response) => {
  const param = request.url.slice(1)

  fs
    .createReadStream(template)
    .pipe(
      render({
        title: param,
        message: param,
        body: `<h3>Hello, ${param}</h3>`
      })
    )
    .pipe(response)
})
