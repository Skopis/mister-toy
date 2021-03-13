import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/store.js'

// Styles
import "./styles/styles.scss";

//google maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAOQahBQ8uKEnmcO7W5dBvkzRwIYXJw9pQ',
    libraries: 'places',
  },
})

//vee-validate


//element-ui
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { locale })
import {
  Select,
  Button
} from 'element-ui'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    console.log('Vue App was created!!!');
    this.$store.dispatch({ type: 'loadToys' })
  },
  render: h => h(app)
}).$mount('#app')