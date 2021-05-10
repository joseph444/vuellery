import firebase from "firebase"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBh7JSCihImKjrMXMIr4wQTCWFXPGBt3xQ",
    authDomain: "vue-gallery-4fcd0.firebaseapp.com",
    projectId: "vue-gallery-4fcd0",
    storageBucket: "vue-gallery-4fcd0.appspot.com",
    messagingSenderId: "729707480322",
    appId: "1:729707480322:web:7269fbcdb0d6be0e69ae1b",
    measurementId: "G-8SRF4CWGJJ"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()
const db      = firebase.firestore()
const auth    = firebase.auth()


const ImageRef = storage.ref('images/')

const profile = db.collection('profile')
const uploads = db.collection('uploads')
const plans = db.collection('plans')


async function logout(){
    var content = {
        success:true
    }
    try{
        await auth.signOut();
        location.reload()
    }catch(error){
        content.success = false 
        if(error.message){
            content["error"] = error.message
        }else{
            content["error"] = error
        }
    }
    
}

export{
    db,auth,storage,ImageRef,profile,uploads,plans,
    logout
}


