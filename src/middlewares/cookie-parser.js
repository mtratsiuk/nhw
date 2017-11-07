import cookie from 'cookie'

export default function cookieParser () {
  return function (req, res, next) {
    req.parsedCookies = cookie.parse(req.headers.cookie || '')
    next()
  }
}
