import {auth,profile} from "../../firebase"

const state = {
    currentUser:null,
}
const getters = {
    getCurrentUser(state){
        return state.currentUser
    },
    
}
const mutations = {
    async setCurrentUser(state,user){
        state.currentUser = user
        
        
    },
    
}
const actions = {
    addUserAuthentication({commit},data){
        const email = data.email.trim()
        const password = data.password.trim()
        const username = data.username.trim()
        const plan = data.plan.trim();

        auth.createUserWithEmailAndPassword(email,password).then(val=>{
            console.log(val.user.uid);
        if(val.user){
            commit("setCurrentUser",val.user)
        const models = require("../../models")
        profile.doc(val.user.uid).set(models.default.profile.profile(username,plan)).then(v=>{
                    location.reload()
                }).catch(async err=>{
                    console.log(err);
                    alert(err.message)
                    await val.user.delete()
                });
        }else{
            console.log("No User");
        }
        
        
        }).catch(reason=>{
            console.log(reason);
            alert(reason.message)
        })

    },
    authUserAuthentication({commit},data){
        const email = data.email.trim()
        const password = data.password.trim()
        

        auth.signInWithEmailAndPassword(email,password).then(val=>{
            location.reload()
        }).catch(reason=>{
            alert(reason.message)
        })

    }
}

export default{
    state,
    getters,
    mutations,
    actions
}