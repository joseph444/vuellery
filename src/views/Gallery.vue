<template>
  <div class="my-6 ">
      <add-photo @close="toggleAddPhoto" v-if="addPhoto"></add-photo>
      
      <button class="floating-btn" @click="toggleAddPhoto" v-else>
          <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
          </svg>
       </button>
       <fullscreen-display @close="CloseThePhoto" v-if="open&&!getClose()" :data="photoTobeOpened"></fullscreen-display>
       <div class="flex flex-wrap justify-items-center w-full p-4 pt-20 md:pt-10 lg:pt-20" v-else>
           <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2" v-if="getPhotos()&&(!addPhoto)">
              
               <div class="w-full max-h-96 overflow-hidden" :class="{' col-span-full mt-4':updateDate(photo.created_at)}" v-for="photo in getPhotos()" :key="photo.id" >
                   <div class="text-sm text-gray-400 mb-1" v-if="updateDate(photo.created_at)" >
                       {{getTheDate(new Date(photo.created_at))}}
                   </div>
                   <show-photo show-photo :id="photo.id" :name="photo.name" :url="photo.url" @open="OpenThePhotoAtIndex(photo.id)"></show-photo>
               </div>
            </div>
            <div class="text-2xl text-center" v-else-if="addPhoto"></div>
            <div class="text-2xl text-center" v-else>
                You have an empty gallery
            </div>
       </div>
  </div>
</template>

<script>
import addPhoto from '../components/photo-comps/add-photo.vue'
import {mapGetters} from "vuex"
import ShowPhoto from '../components/photo-comps/show-photo.vue'
import FullscreenDisplay from '../components/photo-comps/fullscreen-display.vue'
export default {
  components: { addPhoto, ShowPhoto, FullscreenDisplay },
 
  data(){
      return {
          addPhoto:false,
          current:'',
          photoTobeOpened:null,
          open:false
      }
  },
  methods:{
      ...mapGetters(['getPhotos','getLoading','getClose']),
      toggleAddPhoto:function(){
          this.$store.dispatch('photos')
          this.addPhoto=!this.addPhoto
      },
      OpenThePhotoAtIndex:function(i){
          if(this.getClose){
              this.$store.commit('close')
          }
          this.photoTobeOpened = this.getPhotos().filter(x=>{
              return x.id=== i
          })[0]
          //console.log(this.photoTobeOpened);
          this.open = true
      },
      CloseThePhoto:function(){
          if(this.getClose){
              this.$store.commit('close')
          }
          this.photoTobeOpened = null
          this.open = false
      },
      updateDate(date){
          const target = this._getDateString(new Date(date))
          
          //console.log(date,this.upper,this.lower,date-this.upper,date-this.lower);
          return target!==this.current
      },
      update(date){
          this.current = this._getDateString(new Date(date))
      },
      getTheDate(date){
          
          this.update(date.getTime())
          const now=new Date() 
          const todaysDate = new Date(this._getDateString(now))

          const yesterday = new Date((todaysDate-1000*60*60*24)).getTime();

          if(date>=todaysDate){
              return "Today"
          }
          else if(date>=yesterday && date<todaysDate){
              return "Yesterday"
          }else{
              return this._getDateString(new Date(this._getDateString(date)))
          }


      },
      _getDateString:function(date){
          const Months = {
              0:"Jan",
              1:"Feb",
              2:"Mar",
              3:"April",
              4:"May",
              5:"June",
              6:"July",
              7:"Aug",
              8:"Sep",
              9:"Oct",
              10:"Nov",
              11:"Dec"
          }
          return Months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()
      }
  }

}
</script>

<style lang="scss">
.floating-btn{
    @apply p-0 w-14 h-14 fixed z-0 bottom-6 right-6 bg-green-500 rounded-full hover:bg-green-700 hover:shadow-lg cursor-pointer shadow transition ease-in duration-200 focus:outline-none;
}
</style>