import Sequelize from 'sequelize'

export default function ({ sequelize }) {
  const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(400),
      allowNull: false
    }
  })

  Product.associate = function ({ Review }) {
    Product.hasMany(Review)
  }

  return Product
}
