<template>
  <div class="h-full w-full fixed items-center justify-center flex top-0 left-0 " >
      <loading v-if="getLoading()"></loading>
      <div class=" z-20 absolute h-full w-full bg-green-100  " @click="close" v-else>
          <div class="flex flex-row items-center h-full w-full ">
        <div class="flex flex-col items-center w-full">
          <div class="card z-40 bg-white w-full md:w-1/2 opacity-100">
            <div class="card-body " @click.stop="">
                <input type="file" class="hidden" multiple ref="files" @change="addFiles">
                <button class="btn bg-green-300" @click.stop.prevent="openInput">
                    Select Files For Upload
                </button>
                <div class="flex flex-col mt-6 font-2 " v-if="images.length>0" >
                    <div class="text-xl">
                        Selected Files are:
                    </div>
                    <div class="overflow-y-auto" style="max-height:15rem">
                        <div class="text-md font-bold border-t-2 " v-for="(image,i) in images" :key="i">
                        <div class="grid grid-cols-3 gap-1  ">
                            <div class="p-2 text-lg font-bold text-center">
                                {{image.name}}
                            </div>
                            <div class="p-2 text-lg font-bold text-center">
                                {{formatBytes(image.size)}}
                            </div>
                            <div class="p-2 text-lg font-bold text-center">
                                <button class="btn bg-red-400" @click.stop="removeFiles(i)">Remove</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="flex flex-wrap flex-row my-2 items-center text-center">
                        <button class="btn bg-green-500 " @click.stop="uploadImages">
                            Upload
                        </button>
                    </div>
                    
                </div>
            </div>
          </div>
          
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import Loading from '../Loading.vue';
import {mapGetters} from "vuex"
export default {
  components: { Loading },
    data(){
        return {
            images:[],
            
        }
    },
    methods:{
        ...mapGetters(['getLoading']),
        close:function(){
            this.$emit('close')
            console.log("close called");
        },
        openInput:function(){
            this.$refs.files.click()
        },
        addFiles:function(event){
            const Files = event.target.files;
            for (let index = 0; index < Files.length; index++) {
                const img = Files[index]
                
                if(img.type === 'image/jpeg' || img.type === 'image/png' || img.type === 'image/svg+xml' || img.type === 'image/webp')
                    this.images.push(img)
                
            }
        },
        formatBytes:function(bytes, decimals = 2) {
            if (bytes === 0) return '0 Bytes';

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        removeFiles:function(i){
            this.images.splice(i,1)
        },
        uploadImages:function(){
            var UploadData = []
            if(this.images.length>0){
                this.images.forEach((images)=>{
                    UploadData.push({
                        Imgdata:images,
                        tags:[]
                    });
                });
                this.$store.commit('loading')
                this.images=[]
                this.$store.dispatch('uploadPhoto',UploadData)
                
            }
        }
    }
}
</script>

<style lang="scss" >
    .card-body{
       @apply mx-5 my-4 flex flex-col justify-center items-center;
    }
    .btn{
        @apply p-3 text-center uppercase shadow-md rounded-md;
    }
</style>