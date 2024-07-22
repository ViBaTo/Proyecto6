const {
  getSymphonies,
  postSymphony,
  updateSymphony,
  deleteSymphony,
  getSymphoniesByComposer
} = require('../controllers/Symphonies')

const symphonyRoutes = require('express').Router()

symphonyRoutes.get('/composer/:composerId', getSymphoniesByComposer)
symphonyRoutes.get('/', getSymphonies)
symphonyRoutes.post('/', postSymphony)
symphonyRoutes.put('/:id', updateSymphony)
symphonyRoutes.delete('/:id', deleteSymphony)

module.exports = symphonyRoutes
