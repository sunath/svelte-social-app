import { updateProfile } from "firebase/auth"
import { getDownloadURL, ref,uploadBytes } from "firebase/storage"
import { firebaseAuth, firebaseDatabase, firebaseStorage } from "../firebase"
import {} from "firebase/auth"
import type { FirebaseError } from "firebase/app"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { docData } from "rxfire/firestore"




export const replaceUserImage = async (uid,file) => {
    console.log(uid)
    if(!uid)return;
    const path  = `/users/images/${uid}`
    const reference = ref(firebaseStorage,path)
    try{
        await uploadBytes(reference,file)
        await updateProfile(firebaseAuth.currentUser,{
            photoURL:path
        })
    }catch(ex){
        console.log(ex)
    }
}


export const getUserProfilePictureByUrl = async (url) => {
   if(!url)return await getDownloadURL(ref(firebaseStorage,"/users/images/default.png"));
   console.log(typeof(url) , " was it")
   if(url.startsWith("http")) return url;
   const reference = ref(firebaseStorage,url)
   return await getDownloadURL(reference)
}

export const getUserProfileImageById = async (id) => {
    console.log(id)
    console.log(id === "KdN2bPKtIqZmiYAFay7NYZSBvAO2")
    try{
        return await getDownloadURL(ref(firebaseStorage,"/users/images/"+id));
    }catch(ex){
        const exception = ex as FirebaseError;
        if(exception.code === "storage/object-not-found"){
            return await getDownloadURL(ref(firebaseStorage,"/users/images/default.png"))
        }
    }
}


export const getUserProfileData = async (uid) => {
    const q = query(collection(firebaseDatabase,"/profiles/"),where("uid","==",uid))
    const response = await getDocs(q)
    const data = response.docs;
    
    if(data && data[0]){
      
            return {...data[0].data(),id:data[0].id}
        
        
    }
        return false;
    
}


export const setUserProfile = (data) => {
    const profiles = collection(firebaseDatabase,"/profiles/")
    return addDoc(profiles,data)
}

export const updateUserProfile = async (uid,data) => {
    const profile = query(collection(firebaseDatabase,"/profiles/"),where("uid","==",uid))
    const response = await getDocs(profile)
    return updateDoc(doc(firebaseDatabase,`/profiles/${response.docs[0].id}`),data)
}