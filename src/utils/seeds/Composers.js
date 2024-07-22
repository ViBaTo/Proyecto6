const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Composer = require('../../api/models/Composers')
const composers = require('../../data/Composers')

dotenv.config()

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err))

const seedComposers = async () => {
  await Composer.deleteMany({})
  await Composer.insertMany(composers)
  console.log('Compositores insertados')
  mongoose.connection.close()
}

seedComposers().catch((err) =>
  console.error('Error al sembrar la base de datos:', err)
)
