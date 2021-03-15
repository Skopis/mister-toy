const REVIEW_URL = 'review/'
import { httpService } from './http.service.js'

export const reviewService= {
    save,
    query,
    getEmptyReview,
    remove
}
async function remove(reviewId){
    return httpService.delete(REVIEW_URL+reviewId)
                
}
async function save(review){
    return httpService.post(REVIEW_URL, review)
}

async function query(filterBy){
    try{
        const reviews = await httpService.get(REVIEW_URL+filterBy.toyId)
        return reviews
    }
    catch(err){
        throw err
    }
}

function getEmptyReview() { 
return { starCount: null,
txt: ''}
}