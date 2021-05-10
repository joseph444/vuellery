<template>
    <div class="card bg-white custom-w">
        <div class=" text-center text-3xl font-bold uppercase p-3 font-3">
                  Sign-Up 
        </div>
        <hr class=" border-black">
        <div class="p-3 pt-4">
            <div class="flex flex-col flex-wrap">
                <div class="form-control-container">
                    <input type="text" class="form-control" name="username" v-model="username" placeholder="Username">
                </div>
                <div class="form-control-container">
                    <input type="email" class="form-control" name="email" v-model="email" placeholder="Email">
                </div>
                <div class="form-control-container">
                    <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
                </div>
                <div class="flex flex-col  overflow-hidden">
                    <h1 class="text-xl">
                        Choose a plan
                    </h1>
                    <div class=" grid grid-cols-2  gap-1">
                        <div class=" card hover:from-gray-300 bg-white" :class="{'border-black border-2':i.id==plan}"  v-for="i,value in plans" :key="value" @click="selectAPlan(i.id)">
                        <div class="p-3 text-center text-2xl font-2 text-black bg-green-400">
                            {{i.name}}
                        </div>
                        <div class="p-3 text-xl font-1 text-black bg-gray-100">
                            <b>Cost: &#x20B9;{{i.amount}}</b>
                            <br>
                            <strong>Features :</strong>
                            <ol class=" text-center">
                                <li class=" text-sm text-grey-400" v-for="feature,j in i.features" :key="j">
                                {{feature}}
                                </li>
                            </ol>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-1 my-4">
                    <button class="btn bg-green-500" @click="register">Sign Up</button>
                    <div class=" cursor-pointer text-gray-400 text-center" @click="changeForm(2)">
                        Already have an account? <span class="text-blue-600">Login</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import {plans} from "../../firebase"
import {mapGetters} from "vuex"
export default {
    async created(){
        this.plans = []
        try{
            const snapShot =await plans.get();
            console.log(snapShot);
            if(!snapShot.empty){
                snapShot.docs.forEach(doc=>{
                    var plan = {
                        id:doc.id,
                        ...doc.data()
                    }
                    this.plans.push(plan)
                })
            }
            
        }catch(error){
            console.log(error);

        }
    },
    data(){
        return{
            plans:[
            ],
            username:"",
            email:"",
            password:"",
            plan:null
        }
    },
    methods:{
        ...mapGetters(['getPlans']),
        selectAPlan:function(planId){
            console.log(planId);
            this.plan=planId
        },
        
        register:function(){
            var data = {}
            if(this.username.trim()<0){
                alert("Username can't be empty")
                return
            }
            if(this.email.trim()<0){
                alert("email can't be empty")
                return
            }
            if(this.password.trim()<8){
                alert("password is too short")
                return
            }

            data["username"] = this.username.trim()
            data["password"] = this.password.trim()
            data["email"]    = this.email.trim()
            data["plan"]     = this.plan?this.plan:this.plans[0]
            console.log(data);
            this.$store.dispatch('addUserAuthentication',data)
            
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