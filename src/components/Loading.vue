<template>
  <div id="app">
    <div class="h-full w-full fixed items-center justify-center flex top-0 left-0 " >
      <div class=" z-50 absolute h-full w-full bg-green-100 opacity-70 ">
          <div class="flex flex-row items-center h-full w-full ">
            <div class="flex flex-col items-center w-full">
                <img src="../assets/logo.png" alt="logo" class="logo">
            </div>
          
        </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .fullscreen{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  @keyframes grow {
    0%{
      transform:  scale(1);
    }
    50%{
      transform:  scale(2);
    }
    100%{
      transform:  scale(1);
    }
  }

  .logo{
    width: 100px;
    height: 100px;
    animation-name: grow;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }


</style>