import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from "../firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/plans',
    name:'Plans',
    component: function(){
      return import('../views/Plans.vue')
    }
  },
  {
    path:'/signup',
    name:'Signup',
    component: function(){
      return import('../views/Signup.vue')
    },
    meta:{
      guests:true
    }
  },
  
  {
    path:'/gallery',
    name:'Gallery',
    component: function(){
      return import("../views/Gallery.vue")
    },
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/settings',
    name:'Settings',
    component: function(){
      return import("../views/Settings.vue")
    },
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/profile',
    name:'Profile',
    component: function(){
      return import("../views/Profile.vue")
    },
    meta:{
      requiresAuth:true
    }
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
    const requiresAuth = to.matched.some(x=>x.meta.requiresAuth)
    const guests = to.matched.some(x=>x.meta.guests)

    if(requiresAuth){
      if(!auth.currentUser){
        next('/signup')
      }else{
        next()
      }
    }else if(guests){
      if(!auth.currentUser){
        next()
      }else{
        next('/gallery')
      }
    }else{
      next()
    }
})

export default router
