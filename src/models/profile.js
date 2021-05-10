
function profile(username,plan,profile_img=""){
    if (profile_img.trim().length <10){
        profile_img = "https://ik.imagekit.io/visceailxwt/thumb_15951118880user_7xErhshoL.webp";
    }
    
    return {
        username:username,
        plan:plan,
        profile_img:profile_img,
        created_at: new Date().getTime()
    }
}
export default {
    profile
}