import { firebaseDatabase, firebaseStorage } from "../firebase";
import {getDoc,doc,setDoc,updateDoc,addDoc,collection,query,limit, orderBy, startAt, onSnapshot,OrderByDirection, where} from "firebase/firestore"
import {collectionData} from 'rxfire/firestore'
import type { IImagePostModel } from "src/lib/IPostModel";
import {ref,getDownloadURL,getMetadata,uploadBytes} from "firebase/storage"
import {v4 as uuid } from "uuid";
import type { FirebaseError } from "firebase/app";
import { updatePostCounts, updateUserPostCount } from "../functions/setFirebaseConfig";
import { map, startWith } from "rxjs";

export enum PostType {Text,IMAGE}

export const addNewPost = async (data:any,postType:PostType=PostType.Text) => {
     await addDoc(collection(firebaseDatabase,"posts/"),data)
     await (postType === PostType.Text ?  updatePostCounts(1,1,0) : updatePostCounts(1,0,1))
     await updateUserPostCount(data.uid,postType)
}

export const getNormalPosts = (offset:number=0,_limit:number=10) => {
    const q = query(collection(firebaseDatabase,"/posts"),orderBy("createdAt",'desc'))
    return collectionData(q,{
        idField:'id'
    })
}

export const addAImagePost = async (data:IImagePostModel,file:any) => {

  
        const id:string = uuid()
        const reference = ref(firebaseStorage,`images/${data.uid}/${id}`)
        try{
        const url = await getDownloadURL(reference)
        }catch(ex){
            const error = ex as FirebaseError;
            if("storage/object-not-found" !== error.code)return;

                try{
                const response = await uploadBytes(reference,file)
                console.log(response)
                console.log(response.metadata)
                console.log(response.ref)
                data.imageURL = `images/${data.uid}/${id}`;
                await addNewPost(data,PostType.IMAGE)
                return;
                }catch(ex){
                    console.log(ex)
                }
            
        }

}





export const getAImagePostImageUrL = async (path) => {
    try{
    const val = await getDownloadURL(ref(firebaseStorage,path))
    return val;
    }catch(ex){
        console.log(ex)
        return '';
    }
}


export const getPostsOfSpecificUser =  (uid:string) => {

        const col = collection(firebaseDatabase,"/posts")
        const q  = query(col,where("uid","==",uid),orderBy("createdAt","desc"))
        return collectionData(q,{idField:"id"}).pipe(startWith([]))
}