const TOY_URL = 'toy/'
import { httpService } from './http.service.js'

export const toyService = {
    query,
    remove,
    getEmptyToy,
    save,
    getById
}

function query(filterBy) {
    if (filterBy) {
        const params = { byName: filterBy.byName, byType: filterBy.byType, sort: filterBy.sort }
        const queryString = new URLSearchParams(params).toString();
        return httpService.get(TOY_URL + queryString)
    }
    else return httpService.get(TOY_URL)
}

function getById(id) {
    return httpService.get(TOY_URL +'/details/'+ id).then(res => res)
}

function remove(id) {
    return httpService.delete(TOY_URL + id).then(res => res)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(TOY_URL + toy._id, toy).then(res => res)
    }
    else {
        return httpService.post(TOY_URL, toy)
            .then(res => res)
    }
}

function getEmptyToy(name = '', price = 100) {
    return {
        _id: '',
        name,
        price,
        type: [],
        createdAt: Date.now(),
        inStock: true
    }
}
