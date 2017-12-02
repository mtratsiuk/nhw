import Sequelize from 'sequelize'

export default function ({ sequelize }) {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING(128),
      allowNull: false
    }
  })

  User.associate = function ({ Review }) {
    User.hasMany(Review)
  }

  return User
}
