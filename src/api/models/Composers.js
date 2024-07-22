// Archivo Character.js dentro de la carpeta models
const mongoose = require('mongoose')

const composerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    birthYear: {
      type: Number,
      required: true
    },
    deathYear: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    symphonies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Symphony'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'composer'
  }
)

const Composer = mongoose.model('composers', composerSchema, 'composers') // El último indica el nombre de la colección de la base de datos
module.exports = Composer
