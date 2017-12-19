import MongoModel from './mongo-model'

/**
 * @swagger
 *
 * definitions:
 *   City:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       country:
 *         type: string
 *       capital:
 *         type: boolean
 *       location:
 *         type: object
 *         properties:
 *           lat:
 *             type: number
 *           long:
 *             type: number
 */
export default class City extends MongoModel {
  static fields () {
    return {
      name: String,
      country: String,
      capital: Boolean,
      location: {
        lat: Number,
        long: Number
      }
    }
  }

  toDto () {
    return {
      ...super.toDto(),
      name: this.name,
      country: this.country,
      capital: this.capital,
      location: this.location
    }
  }
}
