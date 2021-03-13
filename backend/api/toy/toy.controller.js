const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

async function getToy(req, res) {
    try {
        var toy = await toyService.getById(req.params.id)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function addToy(req, res) {
    try {
        const { name, price, type, createdAt, inStock } = req.body
        var toy = { name, price, type, createdAt, inStock }
        toy = await toyService.add(toy)
        res.send(toy)

    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function getToys(req, res) {
    console.log('req.params at 29', req.params)
    try {
        var byName = req.params.filterBy ? req.params.filterBy.match(/byName=([^&]*)/) : ''
        var byType = req.params.filterBy ? req.params.filterBy.match(/byType=([^&]*)/) : ''
        var sort = req.params.filterBy ? req.params.filterBy.match(/sort=([^&]*)/) : ''
        var filterBy = {
            byName: byName[1],
            byType: byType[1],
            sort: sort[1]
        }
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

async function updateToy(req, res) {
    try {
        const { _id, name, price, type, createdAt, inStock, reviews } = req.body
        var toy = { _id, name, price, type, createdAt, inStock, reviews }
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy,
    addToy
}