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
            <li v-for="(review,idx) in toy.reviews" :key="idx" :v-if="toy.reviews">
                <p>By: {{review.user.fullname}}</p>
                <p>Rating: {{showStars(review.starCount)}}</p>
                <p>"{{review.txt}}"</p>
                <button v-if="isLoggedinUserAdmin" @click="remove(idx)">✖️</button>
            </li>
        </ul>      
        </div>
        <toy-review :toy="toy">Add a review</toy-review>
    </section>
</template>

<script>
import { toyService } from '../services/toy.service.js'
import toyReview from '../cmps/toy-review.vue'
const STAR = '⭐'
export default {
    name: 'toy-details',
    data() {
        return {
            toy: null
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
        time(createdAt){
            return new Date(createdAt).toLocaleString()
        },
        showStars(numOfStars){
            return STAR.repeat(numOfStars) 
        },
        remove(idx){
            this.toy.reviews.splice(idx, 1)
            toyService.save(this.toy)
        }
    },
    created() {
        const idx = this.$route.params.toyId
        toyService.getById(idx)
            .then(toy => {
                this.toy = toy
            })
    },
    components:{
        toyReview
    }
}
</script>