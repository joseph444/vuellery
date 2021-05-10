import {v1} from "uuid"



function upload(name,size,uid,url,tags=[]){
    return {
        name,size,uid,url,tags,
        created_at: new Date().getTime()
    }
}

export default {
    upload
}