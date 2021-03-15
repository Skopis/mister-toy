import { toyStore } from "./toy.store.js";
import { userService } from "../services/user.service.js";
import {reviewService} from '../services/review.service.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: userService.getLoggedinUser(),
  },
  getters:{
    user(state){
      return state.user
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user
    }
  },
  actions: {
    login({commit},{credentials} ){
      userService.login(credentials)
          .then(user => {
              commit({ type: 'setUser', user })
            })
    },
    signup({commit}, {signupCredentials}){
      userService.signup(signupCredentials)
          .then(user => {
              commit({ type: 'setUser', user})
            })
    },
    logout({commit}){
      userService.logout()
          .then(() => {
              commit({ type: 'setUser', user: null })
            })
    },
    addReview(context, {review}){
      reviewService.save(review)
    }
  },
  modules: {
    toyStore
  }
})
