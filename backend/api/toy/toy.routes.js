const express = require('express')
const { getToy, getToys, deleteToy, updateToy, addToy } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/details/:id', getToy)
router.get('/:filterBy?', getToys)
router.post('/', addToy)
router.put('/:id', updateToy)
router.delete('/:id', deleteToy)

module.exports = router