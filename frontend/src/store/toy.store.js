import { userService } from "../services/user.service.js";
import { toyService } from "../services/toy.service.js";


export const toyStore = {
    state: {
        toys: [],
        cartToys: [],
        isLoading: false
    },
    getters: {
        toys(state) { 
            return state.toys 
        },
        cartToys(state) { 
            return state.cartToys
        },
        isLoading(state) {
            return state.isLoading
        },
        cartSize(state) {
            return state.cartToys.length
        },
        cartTotal(state) {
            const total = state.cartToys.reduce((sum, cartToy) => {
                return sum + cartToy.price
            }, 0)
            return total
        },
        cartTotalForDisplay(state, getters) {
            return getters.cartTotal.toLocaleString()
        }
    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setToys(state, {toys}) {
            state.toys = toys;
        },
        addToy(state, { toy }) {
            state.toys.push(toy);
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex(p => p._id === toy._id)
            state.toys.splice(idx, 1, toy);
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(p => p._id === toyId)
            state.toys.splice(idx, 1)
        },
        addToCart(state, { toy }) {
            state.cartToys.unshift(toy);
        },
        removeFromCart(state, { toyId }) {
            const idx = state.cartToys.findIndex(cp => cp._id === toyId);
            state.cartToys.splice(idx, 1)
        },
        clearCart(state) {
            state.cartToys = [];
        },
    },
    actions: {
        loadToys({commit}, {filterBy}) {
            commit({ type: 'setIsLoading', isLoading: true });
            toyService.query(filterBy)
                .then(toys => {
                    commit({ type: 'setToys', toys });
                })
                .catch(err => {
                    console.log('Store: Cannot load toys', err);
                    // throw new Error('Cannot load toys');
                })
                .finally(()=>{
                    commit({ type: 'setIsLoading', isLoading: false });
                })
        },
        saveToy({commit}, { toy }) {
            const type = (toy._id) ? 'updateToy' : 'addToy';
            return toyService.save(toy)
                .then(savedToy => {
                    commit({ type, toy: savedToy })
                })
                .catch(err => {
                    console.log('Store: Cannot save toy', err);
                    throw new Error('Cannot save toy');
                })

        },
        removeToy({commit}, payload) {
            return toyService.remove(payload.toyId)
                .then(() => {
                    commit(payload)
                })
                .catch(err => {
                    console.log('Store: Cannot remove toy', err);
                    throw new Error('Cannot remove toy');
                })
        },
        checkout(context) {
            const amount = context.getters.cartTotal
            return userService.withdrawBalance(amount)
                .then((balance) => {
                    context.commit({ type: 'clearCart' })
                    context.commit({ type: 'setBalance', balance })
                })
                .catch(err => {
                    console.log('Store: Cannot checkout', err);
                    throw err;
                })
        }
    }
}
