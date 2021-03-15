<template>
    <section v-if="toy" class="toy-details">
        <div>
            <router-link to="/toy">Back to Toys</router-link>
            <h3>Toy Name: {{toy.name}}</h3>
            <h3>Toy Types:</h3>
            <p v-for="(type,idx) in toy.type" :key="'T'+idx">{{type}}</p>
            <p>Created at: {{time(toy.createdAt)}}</p>
            <p>In Stock: {{isInStock}}</p>
            <p>Reviews:</p>
        <ul class="review-card">
            <li v-for="(review,idx) in reviews" :key="idx" :v-if="reviews">
                <p>By: {{review.byUser.fullname}}</p>
                <!-- <p>{{review}}</p> -->
                <p>Rating: {{showStars(review.starCount)}}</p>
                <p>"{{review.txt}}"</p>
                <button v-if="isLoggedinUserAdmin" @click="remove(idx, review._id)">✖️</button>
            </li>
        </ul>      
        </div>
        <toy-review :toy="toy" @addReview="addReview">Add a review</toy-review>
        <chat :toy="toy">Start a chat</chat>
    </section>
</template>

<script>
import { toyService } from '../services/toy.service.js'
import toyReview from '../cmps/toy-review.vue'
import { reviewService } from '../services/review.service.js'
import chat from '../cmps/chat.vue'

const STAR = '⭐'
export default {
    name: 'toy-details',
    data() {
        return {
            toy: null,
            reviews: null
        }
    },
    computed:{
        isInStock(){
            return this.toy.inStock ? 'Yes' : 'No'
        },
        isLoggedinUserAdmin(){
            return this.$store.getters.user?.isAdmin || false
        }
    },
    methods:{
        addReview(reviewToAdd){
            console.log('reviewToAdd', reviewToAdd)
            this.reviews.push(reviewToAdd)
        },
        time(createdAt){
            return new Date(createdAt).toLocaleString()
        },
        showStars(numOfStars){
            return STAR.repeat(numOfStars) 
        },
        remove(idx, reviewId){
            this.reviews.splice(idx, 1)
            reviewService.remove(reviewId)
        },
        async setReviews(toyId){
            this.reviews = await reviewService.query({toyId})
        }
    },
    created() {
        const id = this.$route.params.toyId
        toyService.getById(id)
            .then(toy => {
                this.toy = toy
            })
        this.setReviews(id)
    },
    components:{
        toyReview,
        chat
    }
}
</script>