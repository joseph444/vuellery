import Vue from 'vue'
import App from './App.vue'
import Loading from "./components/Loading.vue"
import router from './router'
import store from './store'
import './index.css'
import {auth} from "./firebase"

Vue.config.productionTip = false


let app


new Vue({
  render: function(h) { return h(Loading)}
}).$mount('#app')


if(auth.onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: function (h) { return h(App) }
    }).$mount('#app')
  }
  store.dispatch('fetchAllPlans');
  if(auth.currentUser){
    store.commit('setCurrentUser',auth.currentUser);
    store.dispatch('checkProfile',auth.currentUser);
    store.dispatch('photos');
    
  }
}));

