<template>
    <div class="card bg-white custom-w">
        <div class=" text-center text-3xl font-bold uppercase p-3 font-3">
                  Sign-In 
        </div>
        <hr class=" border-black">
        <div class="p-3 pt-4">
            <div class="flex flex-col flex-wrap">
                
                <div class="form-control-container">
                    <input type="email" class="form-control" name="email" v-model="email" placeholder="Email">
                </div>
                <div class="form-control-container">
                    <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
                </div>
                
                <div class="grid grid-cols-1 gap-1 my-4">
                    <button class="btn bg-green-500" @click="register">Sign In</button>
                    <div class=" cursor-pointer text-gray-400 text-center" @click="changeForm(1)">
                        dont have an account? <span class="text-blue-600">Register</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            email:"",
            password:"",
            
        }
    },
    methods:{
        
        register:function(){
            var data = {}
           
            if(this.email.trim()<0){
                alert("email can't be empty")
                return
            }
            if(this.password.trim()<8){
                alert("password is too short")
                return
            }

           
            data["password"] = this.password.trim()
            data["email"]    = this.email.trim()
            
            
            this.$store.dispatch('authUserAuthentication',data)
            
        },
        changeForm:function(formVal){
            this.$emit("changeForm",formVal);
        }
    }
}
</script>

<style lang="scss">
.form-control{
    @apply px-3 py-4 placeholder-blue-300 text-blue-600 relative bg-gray-100 rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10;
}
.form-control-container{
    @apply relative flex w-full flex-wrap items-stretch mb-3;
}
.custom-w{
    
    @media screen and (min-width:768px ){
        min-width: 24rem;
    }
}
.btn{
    @apply p-4 rounded shadow uppercase font-bold;
}

</style>