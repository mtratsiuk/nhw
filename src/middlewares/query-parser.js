export default function queryParser () {
  return function (req, res, next) {
    req.parsedQuery = req.query
    next()
  }
}
