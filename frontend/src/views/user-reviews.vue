<template>
    <section class="toy-details">
        <ul class="review-list">
            <li v-for="(review,idx) in reviews" :key="idx" class="review-item">
                <p>By: {{review.byUser.fullname}}</p>
                <p>Rating: {{showStars(review.starCount)}}</p>
                <p>"{{review.txt}}"</p>
                <span v-if="isUserAdmin" @click="removeReview(review._id)"> X</span>
            </li>
        </ul>
    </section>
</template>


<script>
    import {reviewService} from '../services/review.service.js'
    export default {
        name: 'user-reviews',
        data() {
            return {
                reviews: null
            }
        },
        computed: {
            isUserAdmin() {
                return this.$store.getters.user?.isAdmin || false
            }
        },
        created() {
            const userId = this.$store.getters.user._id
            this.setReviews(userId)
        },
        methods: {
            showStars(num) {
                return '⭐'.repeat(num)
            },
            async setReviews(userId) {
                this.reviews = await reviewService.query({
                    userId
                })
            },
            async removeReview(reviewId) {
                const userId = this.$store.getters.user._id
                await reviewService.remove(reviewId)
                this.setReviews(userId)
            }
        },
    }
</script>