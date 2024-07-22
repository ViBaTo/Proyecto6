const Symphony = require('../models/Symphonies')

// Obtener todas las sinfonías
const getSymphonies = async (req, res, next) => {
  try {
    const allSymphonies = await Symphony.find().populate('composer')
    return res.status(200).json(allSymphonies)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al obtener las sinfonías', error })
  }
}

// Crear una nueva sinfonía
const postSymphony = async (req, res, next) => {
  try {
    const newSymphony = new Symphony(req.body)
    const symphonySaved = await newSymphony.save()
    return res.status(201).json(symphonySaved)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al guardar la sinfonía', error })
  }
}

// Actualizar una sinfonía
const updateSymphony = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedSymphony = await Symphony.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedSymphony) {
      return res.status(404).json({ message: 'Sinfonía no encontrada' })
    }
    return res.status(200).json(updatedSymphony)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar la sinfonía', error })
  }
}

// Eliminar una sinfonía
const deleteSymphony = async (req, res, next) => {
  try {
    const { id } = req.params
    const symphonyDeleted = await Symphony.findByIdAndDelete(id)
    if (!symphonyDeleted) {
      return res.status(404).json({ message: 'Sinfonía no encontrada' })
    }
    return res.status(200).json({
      message: 'Sinfonía eliminada',
      elemento: symphonyDeleted
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al eliminar la sinfonía', error })
  }
}

// Obtener sinfonías por compositor
const getSymphoniesByComposer = async (req, res, next) => {
  try {
    const { composerId } = req.params
    const symphonies = await Symphony.find({ composer: composerId }).populate(
      'composer'
    )
    return res.status(200).json(symphonies)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al obtener las sinfonías por compositor', error })
  }
}

module.exports = {
  getSymphonies,
  postSymphony,
  updateSymphony,
  deleteSymphony,
  getSymphoniesByComposer
}
