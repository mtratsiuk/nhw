import Sequelize from 'sequelize'
import Model from './model'

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       password:
 *         type: string
 */
export default class User extends Model {
  static fields () {
    return {
      name: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(60),
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
      name: this.name
    }

    if (this.reviews) {
      dto.reviews = this.reviews.map(x => x.toDto())
    }

    return dto
  }
}
