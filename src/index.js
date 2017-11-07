import config from 'nhw/config'
import app from './app'

const port = process.env.PORT || config.port

app.listen(port, () => console.log(`App listening on port ${port}`))
