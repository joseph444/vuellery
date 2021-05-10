import {plans} from "../../firebase"
const state = {
    plans:{}
}
const getters = {
    getPlans(state){
        return state.plans
    },
   
}

const mutations = {
    setPlans(state,plans){
        state.plans = plans
    }
}

const actions = {
    fetchAllPlans({commit}){
        plans.get().then(docs=>{
            if(!docs.empty){
                var data = {}
                docs.docs.forEach(doc=>{
                    data[doc.id] = doc.data()
                })
                commit('setPlans',data)
            }else{
                commit('setPlans',{})
            }
        }).catch(err=>{
            console.log(err);
            commit('setPlans',{})
        })
    }
}

export default {
    state,getters,mutations,actions
}