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
      ref: 'composers',
      required: false
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

const Symphony = mongoose.model('symphonies', symphonySchema, 'symphonies')
module.exports = Symphony
