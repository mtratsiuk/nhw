import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default function () {
  const SALT_ROUNDS = +process.env.NHW_PASSWORD_SALT_ROUNDS || 10
  const JWT_SECRET = process.env.NHW_JWT_SECRET

  function verifyPassword (password, hash) {
    return bcrypt.compare(password, hash)
  }

  function hashPassword (password) {
    return bcrypt.hash(password, SALT_ROUNDS)
  }

  function verifyJwt (token) {
    return jwt.verify(token, JWT_SECRET)
  }

  function createJwt (data) {
    return jwt.sign(data, JWT_SECRET)
  }

  return {
    verifyPassword,
    hashPassword,
    verifyJwt,
    createJwt
  }
}
