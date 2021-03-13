
<template>
    <section class="log-page">
        <h1>Please login</h1>
        <section v-if="loggedinUser">
            Hello Master {{loggedinUser.fullname}}
            <button @click="logout">Logout</button>
        </section>
        <section v-else>
            <hr />
            <form  @submit.prevent="login">
                <h2>Login</h2>
                <input type="text" placeholder="Your username" v-model="credentials.username" />
                <input type="password" v-model="credentials.password" />
                <button>Login</button>
            </form>
            <hr />
            <form  @submit.prevent="signup">
                <h2>Signup</h2>
                <input type="text" placeholder="Your fullname" v-model="signupCredentials.fullname" />
                <input type="text" placeholder="Your username" v-model="signupCredentials.username" />
                <input type="password" v-model="signupCredentials.password" />
                <button>Login</button>
            </form>
        </section>
    </section>
</template>
<script>
export default {
    name: 'user-page',
    data() {
        return {
            credentials: {username: 'admin', password: 'admin'},
            signupCredentials: {username: 'amnon', password: 'am', fullname: 'Amnon Dilfu'}
        }
    },
    computed:{
        loggedinUser(){
            return this.$store.getters.user
        }
    },
    methods: {
        login() {
            this.$store.dispatch({type: 'login', credentials: this.credentials})
        },
        signup() {
            this.$store.dispatch({type: 'signup', signupCredentials: this.signupCredentials})
        },
        logout() {
            this.$store.dispatch({type: 'logout'})
        }
    }
}
</script>