<template>
  <div class=" card bg-gray-500 object-cover h-full">
    <img :src="downloadUrl" :alt="name" class="object-cover w-full h-full" @click="$emit('open',id)">
  </div>
</template>

<script>
import {storage,auth} from "../../firebase"
export default {
    props:['url','id','name'],
    async created(){
        var tmp = this.url.split('/')
        tmp.splice(0,3)
        tmp = tmp.join("/");
        
        const mainPath = "/images/"+auth.currentUser.uid+"/"
        this.downloadUrl = await storage.ref(mainPath).child(tmp).getDownloadURL().catch(err=>console.log())
        /*
        const ref=storage.ref(this.url)
        ref.getDownloadURL().then(val=>{
            this.downloadUrl = val
        }).catch(err=>{console.log(err);})*/
    },
    data(){
        return {
            downloadUrl:''
        }
    },
    methods:{
        
    }
    
}
</script>

<style>

</style>