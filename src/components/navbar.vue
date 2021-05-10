<template>
 
<div class="nav-bar font-3 fixed top-0 w-full">
  <div class="w-full ">
    <nav class="nav">
      <div class="nav-nav">
        <div class="nav-header">
          <a class="nav-header-text" @click="goto('/')">
            Vuellery
          </a>
          
        </div>
        <div class="nav-list-container" >
          <ul class="nav-list" v-if="isAuthenticated">
            
            <li class="nav-item" >
              <a class="nav-link" @click="goto('/gallery')">
                Gallery
              </a>
            </li>
            
            <li class="nav-item" >
              <a class="nav-link" @click="goto('/settings')">
                Settings
              </a>
            </li>
            <li class="nav-item" >
              <a class="nav-link" @click="logout">
                Logout
              </a>
            </li>
           
          </ul>
          <ul class="nav-list" v-else>
            <li class="nav-item" >
              <div class="nav-link" @click="goto('/about')">
                About
              </div>
            </li>
            <li class="nav-item" >
              <div class="nav-link" @click="goto('/plans')">
                Plans
              </div>
            </li>
            <li class="nav-item" >
              <div class="nav-link" @click="goto('/signup')">
                Signup
              </div>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>
  
</template>

<script>
import {auth,logout} from "../firebase"
export default {
  created(){
    this.isAuthenticated = auth.currentUser !== null
  },
  data(){
    return{
      isAuthenticated: false
    }
  },
  watch:{
    isAuthenticated(val){
      this.isAuthenticated= val
    }
  },
  methods:{
    goto:function(site){
     // event.preventDefault()
      this.$router.push(site)
    },
    logout:async function(){
      const content = await logout();
      alert(content.error)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar{
  @apply flex flex-wrap;
}
.nav {
  @apply relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-500;
}
.nav-nav{
  @apply container px-4 mx-auto flex flex-wrap items-center justify-between;
}
.nav-header{
  @apply w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start;
}
.nav-header-text{
 @apply text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white cursor-pointer;
}
.nav-list-container{
  @apply flex sm:flex-grow items-center;
}
.nav-list{
  @apply flex flex-row list-none ml-auto;
}

.nav-link{
  @apply cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75;
}

</style>