import Sequelize from 'sequelize'

export default function ({ sequelize }) {
  const Review = sequelize.define('review', {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Review
}
