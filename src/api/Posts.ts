import { firebaseDatabase, firebaseStorage } from "../firebase";
import {getDoc,doc,setDoc,updateDoc,addDoc,collection,query,limit, orderBy, startAt, onSnapshot,OrderByDirection} from "firebase/firestore"
import {collectionData} from 'rxfire/firestore'
import type { IImagePostModel } from "src/lib/IPostModel";
import {ref,getDownloadURL,getMetadata,uploadBytes} from "firebase/storage"
import {v4 as uuid } from "uuid";
import type { FirebaseError } from "firebase/app";


export const addNewPost = (data:any) => {
    return addDoc(collection(firebaseDatabase,"posts/"),data)
}

export const getNormalPosts = (offset:number=0,_limit:number=10) => {
    const q = query(collection(firebaseDatabase,"/posts"),orderBy("createdAt","desc"))
    return collectionData(q,{
        idField:'id'
    })
}

export const addAImagePost = async (data:IImagePostModel,file:any) => {

  
        const id:string = uuid()
        const reference = ref(firebaseStorage,`images/${data.uid}/${id}`)
        try{
        const url = await getDownloadURL(reference)
        console.log(url)
        }catch(ex){
            const error = ex as FirebaseError;
            if("storage/object-not-found" !== error.code)return;

                try{
                const response = await uploadBytes(reference,file)
                console.log(response)
                console.log(response.metadata)
                console.log(response.ref)
                data.imageURL = `images/${data.uid}/${id}`;
                await addNewPost(data)
                return;
                }catch(ex){
                    console.log(ex)
                }
            
        }

}





export const getAImagePostImageUrL = async (path) => {
    try{
    const val = await getDownloadURL(ref(firebaseStorage,path))
    console.log(val, " was it")
    return val;
    }catch(ex){
        console.log(ex)
        return '';
    }
}