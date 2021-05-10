<template>
 <div class="flex flex-col  bg-green-300  items-center w-full h-screen py-36 lg:pt-20">
      <div class="flex flex-row items-center h-full md:mt-0">
        <div class="flex flex-col items-center w-full">
          <form-1 class="" v-if="form==1" @changeForm="chgfm"></form-1>
          <form-2 v-else @changeForm="chgfm"></form-2>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import form1 from '../components/Forms/form-1.vue'
import Form2 from '../components/Forms/form-2.vue'
export default {
    data(){
        return{
            form:1
        }
    },
  components: { form1, Form2 },
  methods:{
      chgfm:function(event){
          this.form = event
      }
  }

}
</script>

<style lang="scss">
 .fullscreen{
   
    height: 90vh;
    overflow: hidden;
  }
  .card{
      @apply container rounded-lg shadow-lg flex flex-col flex-wrap;
  }
</style>