<template>
  <div class="h-full w-full fixed items-center justify-center flex top-0 left-0 " @click="close">
      <div class=" z-50 absolute h-full w-full bg-black overflow-y-auto ">
          <div class="absolute  text-sm text-yellow-50" @click.stop="">
              <div class="relative inline-block text-left">
  <div>
    <button type="button" class="btn" @click="dd=!dd">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>
    </button>
  </div>

 
  <div class="dd-container"  v-if="dd">
    <div class="py-1" >
      <a :href="downloadUrl" target="_blank" class="dd-item" download>Download</a>
      <button class="dd-item" @click="details">Details</button>
      <button class="dd-item" @click="deletePhoto">Delete</button>
      <button class="dd-item" @click="close">Close</button>
    </div>
  </div>
</div>
          </div>
          <div class="flex flex-row items-center w-full h-full">
            <div class="flex flex-col items-center w-full md:mx-32 md:my-32">
                <img :src="downloadUrl" :alt="data.name" class="object-contain bg-gray-300" @click.stop="">
            </div>
          </div>
          
          
      </div>
      
  </div>
</template>

<script>
import {storage,auth} from "../../firebase"
import {mapGetters} from "vuex"
import addPhoto from './add-photo.vue'
export default {
 
    props:['data'],
    async created(){
        //this.details()
        var tmp = this.data.url.split('/')
        tmp.splice(0,3)
        tmp = tmp.join("/");
        
        const mainPath = "/images/"+auth.currentUser.uid+"/"
        this.downloadUrl = await storage.ref(mainPath).child(tmp).getDownloadURL().catch(err=>console.log(err))
        /*
        const ref=storage.ref(this.url)
        ref.getDownloadURL().then(val=>{
            this.downloadUrl = val
        }).catch(err=>{console.log(err);})*/
    },
    data(){
        return {
            downloadUrl:'',
            dd:false
        }
    },
    methods:{
        ...mapGetters(['getClose']),
        close:function(){
            this.$emit('close')
        },
        
        details:function(){
            const size = addPhoto.methods.formatBytes(this.data.size);
            var tmp = this.data.name.split('_')
            tmp.splice(0,1)
            const name = tmp.join("_");
            const created_at = new Date(this.data.created_at).toString()
            alert("Name: "+name+"\nSize: "+size+"\nCreated At: "+created_at)
        },
        deletePhoto:function(){
            this.$store.dispatch("deletePhoto",this.data.id)
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .dd-btn{
        @apply inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500;
    }
    .dd-container{
        @apply origin-top-right absolute  left-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none;
    }
    .dd-item{
        @apply text-gray-700 block px-4 py-2 text-sm;
    }
</style>

