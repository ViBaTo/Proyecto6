const mongoose = require('mongoose')

const symphonySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    composer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Composer',
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'symphonies'
  }
)

const Symphony = mongoose.model('Symphony', symphonySchema)
module.exports = Symphony
