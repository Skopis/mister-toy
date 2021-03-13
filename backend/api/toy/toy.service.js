const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByToyname,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const sort = _buildSort(filterBy)
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).collation({locale: "en" }).sort(sort).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function getByToyname(toyname) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ toyname })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyname}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        console.log('toy at 60', toy)
        var toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: toy.createdAt,
            inStock: toy.inStock,
            reviews: toy.reviews
        }
        console.log('toyToSave at 70', toyToSave)
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const toyToAdd = {
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: toy.createdAt,
            inStock: toy.inStock,
            reviews: []
        }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildSort(filterBy) {
    var sort = {}
    console.log('filterBy.sort', filterBy.sort)
    if (filterBy.sort === 'name') sort = { name: 1 }
    if (filterBy.sort === 'price') sort = { price: 1 }
    if (filterBy.sort === 'in-stock') sort = { inStock: 1 }
    return sort
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byName) {
        const nameCriteria = { $regex: filterBy.byName, $options: 'i' }
        criteria.name = nameCriteria
    }
    if (filterBy.byType) {
        const typeCriteria = { $regex: filterBy.byType, $options: 'i' }
        criteria.type = typeCriteria
    }
    return criteria
}

// function query(filterBy) {
//     console.log('filterBy.sort', filterBy.sort)
//     var toysToShow = []
//     if ((!filterBy.sort || filterBy.sort === 'all') && !filterBy.byName && (!filterBy.byType || filterBy.byType === 'all')) return Promise.resolve(gToys)
//     if (filterBy.byName) {
//         toysToShow = gToys.filter(toy => {
//             return toy.name.toLowerCase().includes(filterBy.byName.toLowerCase())
//         })
//     }
//     if (filterBy.byType) {
//         gToys.forEach(toy => {
//             for (let i = 0; i < toy.type.length; i++) {
//                 if (toy.type[i] === filterBy.byType) toysToShow.push(toy)
//             }
//         })
//     }
//     if (filterBy.sort) {
//         if (filterBy.sort === 'in-stock') {
//             toysToShow = gToys.filter(toy => {
//                 return toy.inStock
//             })
//         }
//         else if (filterBy.sort === 'name') {
//             console.log('hi sort')
//             toysToShow = gToys.sort(function (a, b) {
//                 if (a.name < b.name) { return -1; }
//                 if (a.name > b.name) { return 1; }
//                 return 0;
//             })
//         }
//         else {//price
//             toysToShow = gToys.sort(function (a, b) {
//                 return a.price - b.price
//             })
//         }
//     }

//     return Promise.resolve(toysToShow)
// }

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}