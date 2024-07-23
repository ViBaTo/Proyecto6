const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Composer = require('../api/models/Composers')
const Symphony = require('../api/models/Symphonies')
const symphoniesData = require('../data/Symphonies')
const composersData = require('../data/Composers')

dotenv.config()

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err))

const seedDatabase = async () => {
  try {
    await Composer.deleteMany({})
    await Symphony.deleteMany({})

    const savedComposers = await Composer.insertMany(composersData)

    for (const symphonyData of symphoniesData) {
      const composer = savedComposers.find(
        (c) => c.name === symphonyData.composerName
      )
      if (composer) {
        const newSymphony = new Symphony({
          title: symphonyData.title,
          year: symphonyData.year,
          composer: composer._id,
          duration: symphonyData.duration,
          img: symphonyData.img
        })

        const savedSymphony = await newSymphony.save()
        composer.symphonies.push(savedSymphony._id)
        await composer.save()
      }
    }

    console.log('Base de datos sembrada correctamente')
    mongoose.connection.close()
  } catch (err) {
    console.error('Error al sembrar la base de datos:', err)
  }
}

seedDatabase()
