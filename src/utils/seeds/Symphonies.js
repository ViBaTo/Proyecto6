const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Composer = require('../../api/models/Composers')
const Symphony = require('../../api/models/Symphonies')
const symphonies = require('../../data/Symphonies')

dotenv.config()

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err))

const seedSymphonies = async () => {
  await Symphony.deleteMany({})

  const composers = await Composer.find()

  for (const symphonyData of symphonies) {
    let composerName = ''
    if (symphonyData.title.includes('Beethoven'))
      composerName = 'Ludwig van Beethoven'
    if (symphonyData.title.includes('Mozart'))
      composerName = 'Wolfgang Amadeus Mozart'
    if (symphonyData.title.includes('Schubert')) composerName = 'Franz Schubert'
    if (symphonyData.title.includes('Brahms')) composerName = 'Johannes Brahms'
    if (symphonyData.title.includes('Tchaikovsky'))
      composerName = 'Pyotr Ilyich Tchaikovsky'

    const composer = composers.find((c) => c.name === composerName)

    if (composer) {
      const newSymphony = new Symphony({
        ...symphonyData,
        composer: composer._id
      })

      const savedSymphony = await newSymphony.save()
      composer.symphonies.push(savedSymphony._id)
      await composer.save()
    }
  }

  console.log('Sinfonías insertadas')
  mongoose.connection.close()
}

seedSymphonies().catch((err) =>
  console.error('Error al sembrar la base de datos:', err)
)
