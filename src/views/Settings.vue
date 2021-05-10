<template>
  <div class="flex flex-col items-center w-full h-screen pt-32 lg:pt-20 md:px-10 lg:px-20 text-black">
      <div class="card w-full md:w-1/2">
          <div class="text-3xl text-black font-2">
              Details
          </div>
          <hr class="border-black">
          <div class="card-body p-2">
              <div class="flex justify-between items-start w-full">
                
                  <div class="text-xl text-gray-500 font-3">
                      Profile Details
                    </div>
              </div>
              <div class="grid grid-cols-2 text-lg font-2  font-bold px-5 w-full">
                  <div class="">Username</div><div class="">{{getProfile().username}}</div>
                  <div>Email</div><div>{{getCurrentUser().email}}</div>
                  <div>Current Plan</div><div class="uppercase">{{getPlans()[getProfile().plan].name}}</div>
              </div>
              <div class="flex justify-between items-start mt-2 w-full">
                  <div class="text-xl text-gray-500 font-3">Usage Details</div>
              </div>
              <div class="grid grid-cols-2 text-lg font-2  font-bold px-5 w-full">
                  <div class="">Maximum Photos</div><div class="">{{getPlans()[getProfile().plan].max}}</div>
                  <div>Number Of Uploads</div><div>{{getPhotos()?getPhotos().length:0}}</div>
                  <div>Number Of Remaing</div><div class="uppercase">{{getPlans()[getProfile().plan].max-(getPhotos()?getPhotos().length:0)}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {plans,auth} from "../firebase"

export default {

data(){
    return{
        myPlan: '',
        currentUser:'',
        plans:[],
        photos:[]

    }
},
methods:{
    ...mapGetters(['getPhotos','getProfile','getPlans','getCurrentUser'])
}
}
</script>

<style>

</style>