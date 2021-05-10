import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import profile from './modules/profile'
import uploads from './modules/uploads'
import plans from './modules/plan'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    profile,
    uploads,
    plans
    
  }
})
