import Sequelize from 'sequelize'
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

  for (let [name, model] of Object.entries(models)) {
    context[name] = model({ sequelize })
  }

  for (let model of Object.values(context)) {
    if (typeof model.associate === 'function') {
      model.associate(context)
    }
  }

  await sequelize.sync({ force: true })

  return context
}
