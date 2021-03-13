<template>
    <section v-if="toy">
        <router-link to="/toy">Back to Toys</router-link>
        <h3>Toy Name: {{toy.name}}</h3>
        <p>Toy Type: {{toy.type}}</p>
        <p>Created at: {{toy.createdAt}}</p>
        <p>In Stock: {{isInStock}}</p>
        <p>Reviews:</p>
        <ul class="toy-list">
            <li v-for="(review,idx) in toy.reviews" :key="idx">
                <p>By: {{review.user.fullname}}</p>
                <p>Rating: {{review.starCount}}</p>
                <p>"{{review.txt}}"</p>
                <button v-if="isLoggedinUserAdmin" @click="remove(idx)">X</button>
            </li>
        </ul>      
        <toy-review :toy="toy">Add a review</toy-review>
    </section>
</template>


<script>
import { toyService } from '../services/toy.service.js'
import toyReview from '../cmps/toy-review.vue'
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
        remove(idx){
            this.toy.reviews.splice(idx, 1)
            toyService.save(this.toy)
        }
    },
    created() {
        const idx = this.$route.params.toyId
        toyService.getById(idx)
            .then(toy => {
                console.log('toy', toy)
                this.toy = toy
            })
    },
    components:{
        toyReview
    }
}
</script>