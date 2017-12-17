import Sequelize from 'sequelize'
import Model from './model'

/**
 * @swagger
 *
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       description:
 *         type: string
 */
export default class Product extends Model {
  static fields () {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(400),
        allowNull: false
      }
    }
  }

  static associate ({ Review }) {
    this.hasMany(Review)
  }

  toDto () {
    const dto = {
      ...super.toDto(),
      name: this.name,
      description: this.description
    }

    if (this.reviews) {
      dto.reviews = this.reviews.map(x => x.toDto())
    }

    return dto
  }
}
