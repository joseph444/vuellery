import {profile} from "../../firebase"

const state = {
    profile:{}
}

const getters = {
    getProfile(state){
        return state.profile
    }
}

const mutations = {
    setProfile(state,data){
        state.profile = data
    }
}

const actions = {
    checkProfile({commit},user){
        profile.doc(user.uid).get().then(async val=>{
            if(val.exists){
                commit('setProfile',val.data())
            }else{
                await user.delete()
                location.reload()
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}

export default {
    state,getters,mutations,actions
}