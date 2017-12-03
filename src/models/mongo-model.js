export default class MongoModel {
  static fields () {
    return {}
  }

  toDto () {
    return {
      id: this._id
    }
  }
}
