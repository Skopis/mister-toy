<template>
    <section v-if="loggedUser" class="toy-review">
        <h2>Write a review about: <h1 class="capitalize">{{toy.name}}</h1>
        </h2>
        <form >
            <label for="full-name">Full Name: </label>
            <input type="text" id="full-name" placeholder="full Name" v-model="loggedUser.fullname">
            <label for="review-text">Review: </label>
            <textarea rows="12" id="review-text" placeholder="place your review" type="text" v-model="review.txt"></textarea>
            <span class="rate-with-stars">
                <p>Rate this toy</p>
                <ol class="star-list">
                    <span class="star star-1 fa fa-star" @click="updateStarCount(1)"></span>
                    <span class="star star-2 fa fa-star" @click="updateStarCount(2)"></span>
                    <span class="star star-3 fa fa-star" @click="updateStarCount(3)"></span>
                    <span class="star star-4 fa fa-star" @click="updateStarCount(4)"></span>
                    <span class="star star-5 fa fa-star" @click="updateStarCount(5)"></span>
                </ol>
            </span>
            <el-button @click="submitReview">Submit</el-button>
        </form>
    </section>
</template>

<script>
import { showMsg } from '../services/eventBus.service.js';
import {reviewService} from '../services/review.service.js'

    export default {
        name: 'toy-review',
        props: ['toy'],
        data() {
            return {
                loggedUser: null,
                review : {
                    txt: '',
                    starCount: null,
                    user: ''
                }
            }
        },
        created(){
            this.loggedUser = this.loggedinUser
        },
        methods: {
            updateStarCount(numOfStars) {
                for (let i = 1; i <= 5; i++) {
                    document.querySelector(`.star-${i}`).classList.remove('selected')
                }
                this.review.starCount = numOfStars;
                for (let i = 1; i <= numOfStars; i++) {
                    document.querySelector(`.star-${i}`).classList.add('selected')
                }
            },
            async submitReview() {
                this.review.byUserId = this.loggedinUser._id
                this.review.aboutToyId = this.toy._id
                try{
                    await this.$store.dispatch({type: 'addReview', review: this.review})
                    this.review = reviewService.getEmptyReview()
                    showMsg('Review Saved')
                }
                catch(err){
                    showMsg('cant save review')
                }
                
            }
        },
        computed: {
            loggedinUser() {
                return this.$store.getters.user
            },
            name(){
                return loggedinUser ? loggedinUser.fullname : ''
            }
        }
    }
</script>