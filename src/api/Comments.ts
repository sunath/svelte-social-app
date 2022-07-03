import { addDoc, collection, orderBy, query, where } from "firebase/firestore"
import { firebaseDatabase } from "../firebase"
import {collectionData} from "rxfire/firestore"





export const readLatestComments = () => {

}

export const addAComment = (data:any) => {
    return addDoc(collection(firebaseDatabase,"/comments"),data)
}


export const getCommentsOfAPost = (postId) => {
    const q = query(collection(firebaseDatabase,"/comments"),where("postId","==",postId),orderBy("createdAt","desc"))
    return collectionData(q,{
        idField:"id"
    })
}