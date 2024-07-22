const {
  getComposers,
  postComposer,
  updateComposer,
  deleteComposer,
  getComposerByCategory
} = require('../controllers/Composers')

const composerRoutes = require('express').Router()
composerRoutes.get('/getByCategory/:category', getComposerByCategory)
composerRoutes.get('/', getComposers)
composerRoutes.post('/', postComposer)
composerRoutes.put('/:id', updateComposer)
composerRoutes.delete('/:id', deleteComposer)

module.exports = composerRoutes
