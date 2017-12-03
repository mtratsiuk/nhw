import Sequelize from 'sequelize'
import { camelCase } from 'lodash'
import * as models from 'nhw/models'

export default async function createDbContext () {
  const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.NHW_PG_HOST,
      dialect: 'postgres'
    }
  )

  const context = {}

  for (let [name, Model] of Object.entries(models)) {
    Model.init({
      sequelize,
      fields: Model.fields(),
      options: {
        tableName: camelCase(name),
        modelName: camelCase(name),
        ...Model.options()
      }
    })

    context[name] = Model
  }

  for (let Model of Object.values(context)) {
    if (typeof Model.associate === 'function') {
      Model.associate(context)
    }
  }

  await sequelize.sync({ force: true })

  return context
}
