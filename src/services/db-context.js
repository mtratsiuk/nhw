import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import { camelCase } from 'lodash'
import * as models from 'nhw/models'

mongoose.Promise = global.Promise

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

  const mongoDb = await mongoose.connect(
    `mongodb://${process.env.NHW_MONGO_HOST}/${process.env.NHW_MONGO_DB}`,
    {
      useMongoClient: true
    }
  )

  const context = {}

  for (let [name, Model] of Object.entries(models)) {
    if (Model.prototype instanceof Sequelize.Model) {
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
    } else {
      const schema = new mongoose.Schema(Model.fields())
      schema.loadClass(Model)
      context[name] = mongoDb.model(name, schema)
    }
  }

  for (let Model of Object.values(context)) {
    if (typeof Model.associate === 'function') {
      Model.associate(context)
    }
  }

  await sequelize.sync({ force: true })

  return context
}
