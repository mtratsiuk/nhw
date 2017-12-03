import MongoModel from './mongo-model'

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
