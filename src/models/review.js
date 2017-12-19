import Sequelize from 'sequelize'
import Model from './model'

/**
 * @swagger
 *
 * definitions:
 *   Review:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       userId:
 *         type: number
 *       productId:
 *         type: number
 *       text:
 *         type: string
 */
export default class Review extends Model {
  static fields () {
    return {
      text: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }
  }

  toDto () {
    return {
      ...super.toDto(),
      text: this.text,
      userId: this.userId,
      productId: this.productId
    }
  }
}
