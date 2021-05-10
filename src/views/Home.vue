<template>
  <div class="flex flex-wrap mt-24 lg:mt-20">
    <div class="w-full">
      <div class="flex flex-col flex-wrap relative justify-between">
          <div class="flex flex-row items-center">
              <div class="banner mx-auto uppercase font-bold font-1 text-3xl text-center">
                  <div class="absolute flex flex-wrap flex-col w-full h-full items-center">
                    <div class="flex flex-wrap flex-row h-full items-center">
                      <h1 class="text-white text-5xl font-1">Vuellary</h1>
                    </div>
                  </div>
                  <img src="../assets/xxxx.jpg" alt="banner" class="object-cover w-full h-full">
              </div>
          </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'Home',
  
}
</script>
<style lang="scss" scoped>
  .banner{
    @apply w-full bg-green-100 mx-3 md:mx-16 my-3 shadow rounded-md h-96;
  }
</style>
