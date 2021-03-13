<template>
    <header>
        <div class="header-main-content">
        <h2>Toy Shop</h2> 
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/toy">Toy Shop</router-link> |
            <router-link to="/map">Map</router-link> |
            <router-link to="/auth">Log In</router-link>
        </nav>
        </div>
        <section class="user-info">
            Hello, {{user.fullname}} | Your Balance: ${{user.balance}}
        </section>
        <h4>
            <span>{{cartSize}}</span>
            Toys in your Cart
            <a href="#" @click="isCartShown=!isCartShown" v-if="cartToys.length > 0">
                ({{(isCartShown)? 'hide' : 'show'}})
            </a>
        </h4>
        <section class="cart" v-if="isCartShown && cartSize > 0">
            <h5>Your Cart</h5>
            <ul>
                <li v-for="toy in cartToys" :key="'A'+toy._id">
                    {{toy.name}}
                    <button @click="removeFromCart(toy._id)">x</button>
                </li>
            </ul>
            <p>Total: \${{cartTotal}} </p>
            <button @click="checkout">Checkout</button>
        </section>
        
    </header>
</template>

<script>
    export default {
        data() {
            return {
                isCartShown: false
            }
        },
        computed: {
            cartSize() {
                return this.$store.getters.cartSize
            },
            cartTotal() {
                return this.$store.getters.cartTotalForDisplay
            },
            cartToys() {
                return this.$store.getters.cartToys
            },
            user() {
                return this.$store.getters.user || {fullname: 'No loggedin User', username: ''}
            }
        },
        methods: {
            removeFromCart(toyId) {
                this.$store.commit({ type: 'removeFromCart', toyId })
            },
            checkout() {
                console.log('Checking out');
                this.$store.dispatch({ type: 'checkout' })
                    .catch(err => {
                        showMsg(err, 'danger')
                    })
            }
        }
    }
</script>