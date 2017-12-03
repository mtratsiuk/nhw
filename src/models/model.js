import Sequelize from 'sequelize'

export default class Model extends Sequelize.Model {
  static init ({ sequelize, fields, options }) {
    return super.init(fields, {
      sequelize,
      ...options
    })
  }

  static fields () {
    return {}
  }

  static options () {
    return {}
  }

  toDto () {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
