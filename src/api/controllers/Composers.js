//! CRUD -> CREATE READ UPDATE DELETE

const Composer = require('../models/Composers')

const getComposers = async (req, res, next) => {
  try {
    const allComposers = await Composer.find().populate('symphonies') // Encentra todos los datos de dicha colección
    return res.status(200).json(allComposers)
  } catch (error) {
    return (
      res.status(400),
      json({ message: 'Error al obtener los compositores', error })
    )
  }
}

const postComposer = async (req, res, next) => {
  try {
    const newComposer = new Composer(req.body)
    const composerSaved = await newComposer.save()
    return res.status(201).json(composerSaved)
  } catch (error) {
    return (
      res.status(400),
      json({ message: 'Error al guardar el compositor', error })
    )
  }
}

const updateComposer = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const composer = await Composer.findById(id)
    if (!composer) {
      return res.status(404).json({ message: 'Compositor no encontrado' })
    }

    // Combinación de sinfonías sin duplicados
    if (updateData.symphonies) {
      const symphonySet = new Set(composer.symphonies.map((s) => s.toString()))
      updateData.symphonies.forEach((symphonyId) => symphonySet.add(symphonyId))
      composer.symphonies = Array.from(symphonySet)
    }

    // Actualizar otros campos
    Object.keys(updateData).forEach((key) => {
      if (key !== 'symphonies') {
        composer[key] = updateData[key]
      }
    })

    const updatedComposer = await composer.save()
    return res.status(200).json(updatedComposer)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar el compositor', error })
  }
}

const deleteComposer = async (req, res, next) => {
  try {
    const { id } = req.params
    const composerDeleted = await Composer.findByIdAndDelete(id)
    if (!composerDeleted) {
      return res.status(404).json({ message: 'Compositor no encontrado' })
    }
    return res.status(200).json({
      message: 'Elemento eliminado',
      elemento: composerDeleted
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al eliminar el compositor', error })
  }
}

const getComposerByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const composers = await Composer.find({ category }).populate('symphonies')
    return res.status(200).json(composers)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
  getComposers,
  getComposerByCategory,
  postComposer,
  updateComposer,
  deleteComposer
}
