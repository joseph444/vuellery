import {auth,uploads,storage,plans,profile} from "../../firebase"
import models from "../../models"
import {v1} from "uuid"
import router from "../../router"

const uuid = v1

const state = {
    photos : [],
    loading:false,
    close:false,
}
const getters = {
    getPhotos:function(state){
        return state.photos
    },
    getLoading:function(state){
        return state.loading
    },
    getClose(state){
        return state.close
    }
}
const mutations = {
    photos:function(state,data){
        state.photos = data
    },
    loading:function(state){
        state.loading = !state.loading
    },
    close:function(state){
        state.close = !state.close
    }

}
const actions = {
    photos:function({commit}){
        
        

        const uid = auth.currentUser.uid

        uploads.where("uid",'==',uid).orderBy('created_at','desc').get().then(val=>{
            if(!val.empty){
                var arrOfDocs = []
                val.docs.forEach((docs)=>{
                    arrOfDocs.push({
                        id:docs.id,
                        ...docs.data()
                    })
                });
                
            } commit("photos",arrOfDocs)
        }).catch(err=>{
            commit("photos",[])
            console.log(err);
        })
    },


    uploadPhoto:async function({dispatch,commit},datas=[]){
        const uid = auth.currentUser.uid
        try {

            const snapshot = await uploads.where('uid','==',uid).get()
            
            const no_of_uploads = snapshot.docs.length
            const userProfile = await profile.doc(uid).get()

            const plan = await plans.doc(userProfile.data().plan).get()
            if(plan.exists || plan.data.max<no_of_uploads){
                const path = "/images/"+uid+"/"
                datas.forEach( (data,i)=>{
                    
                    const Imgdata = data.Imgdata
                    const name = uuid()+"_"+Imgdata.name
                    const size = Imgdata.size
                    const tags = data.tags

                    const ref = storage.ref(path+name).put(Imgdata)

                    ref.on('state_changed',ss=>{

                    },error=>{
                        alert(error.message)
                    },async ()=>{
                        const uploadData = models.uploads.upload(name,size,uid,path+name,tags)
                        uploads.doc(uuid()).set(uploadData).then(val=>{
                            if(i==datas.length-1){
                                
                                commit('loading')
                            }
                        })
                        
                    })

                });
            }else{
                alert('Please Change Your Existing Plan To Add More Photos')
            }
        } catch (error) {
            console.log(error.message);
            location.reload()
        }
        
    },
    async deletePhoto({dispatch,commit},id){
        const uid = auth.currentUser.uid
        try {
            const Photodata = await uploads.doc(id).get();
            if(Photodata.exists){
                var data = Photodata.data()
                if(data.uid === uid){
                    var tmp = data.url.split('/')
                    tmp.splice(0,3)
                    tmp = tmp.join("/");
                    
                    const mainPath = "/images/"+auth.currentUser.uid+"/"
                    storage.ref(mainPath).child(tmp).delete().then( val=>{
                       uploads.doc(id).delete().then(q=>{
                           dispatch('photos')
                           commit('close')
                       })
                    }).catch(er=>{
                        console.log(err);
                        
                    })
                }
                
            }
        } catch (error) {
            alert(error.message)
        }
        


    }

}


export default {
    state,getters,mutations,actions
}