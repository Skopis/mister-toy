<template>
    <div class="toy-app main-content">  
        <toy-filter @filtered="setFilter"/>
        <p v-if="isLoading">Loading...</p>
        <div v-else class="toy-list-container">
            <el-button  class="reload-toys-btn" @click="loadToys">Reload Toys</el-button>
            <user-msg></user-msg>
            <ul class="toy-list">
                <li v-for="toy in toys" :key="'B'+toy._id">
                    {{toy.name}} | ${{toy.price}} | In Stock: {{toy.inStock}} <br> Type: 
                        <p class="type-list"><span v-for="t in toy.type" :key="'A'+t">&#10240;{{t}}</span></p>
                    <div class="button-container">
                        <button @click="removeToy(toy._id)">&#127367;</button>
                        <router-link :to="'/toy/details/'+toy._id">ℹ️</router-link>
                        <button @click="editToy(toy)">✎</button>
                        <button @click="addToCart(toy)">🛒</button>
                    </div>
                </li>
            </ul>
        </div>
        <toy-add :toyToEdit="toyToEdit" @saveToy="saveToy"/>
    </div>
</template>

<script>
import { showMsg } from '../services/eventBus.service.js'
import userMsg from '../cmps/user-msg.vue'
import toyAdd from '../cmps/toy-edit.vue'
import { toyService } from '../services/toy.service.js'
import toyFilter from '../cmps/toy-filter.vue'

export default {
    name: 'toy-app',
    data() {
        return {
            toyToEdit: toyService.getEmptyToy(),
            filterBy: null,
            value: ''
        }
    },
    computed: {
        toys() {
            return this.$store.getters.toys
        },
        isLoading() {
            return this.$store.getters.isLoading
        }
    },
    created() {
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
            this.loadToys()
        },
        loadToys() {
            this.$store.dispatch({ type: 'loadToys' , filterBy: this.filterBy})
        },
        editToy(toy) {
            this.toyToEdit = JSON.parse(JSON.stringify(toy));
        },
        addToCart(toy) {
            console.log(`Adding`, toy, ` to Cart`);
            this.$store.commit({ type: 'addToCart', toy })
        },
        saveToy() {
            console.log('Saving...', this.toyToEdit);
            this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
                .then(() => {
                    showMsg('Toy saved')
                    this.toyToEdit = toyService.getEmptyToy()
                })
                .catch(err => {
                    showMsg('Cannot save toy', 'danger')
                })
        },
        removeToy(toyId) {
            console.log('Removing...', toyId);
            this.$store.dispatch({ type: 'removeToy', toyId })
                .then(() => {
                    showMsg('Toy removed')
                })
                .catch(err => {
                    showMsg('Cannot remove toy', 'danger')
                })
        }
    },
    components:{
        toyFilter,
        toyAdd,
        userMsg
    }
}
</script>