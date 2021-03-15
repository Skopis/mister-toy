const REVIEW_URL = 'review/'
import { httpService } from './http.service.js'

export const reviewService = {
    save,
    query,
    getEmptyReview,
    remove
}
function remove(reviewId) {
    return httpService.delete(REVIEW_URL + reviewId)

}
function save(review) {
    return httpService.post(REVIEW_URL, review)
}

async function query(filterBy) {
    const params = { toyId: filterBy.toyId || '', userId: filterBy.userId || ''}
    const queryString = new URLSearchParams(params).toString();
    try {
        const reviews = await httpService.get(REVIEW_URL + queryString)
        return reviews
    }
    catch (err) {
        throw err
    }
}

function getEmptyReview() {
    return {
        starCount: null,
        txt: ''
    }
}