import { addDoc, collection, doc, getDoc,getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import type { IFirebaseUserPostCount } from "../lib/IFirebaseUserPostCount"
import { firebaseDatabase } from "../firebase"
import { catchError } from "rxjs"
import { PostType } from "../api/Posts"
import { ref } from "firebase/storage"
import { add_classes } from "svelte/internal"




export const setFirebasePostCount = async () => {
    
    const response =  await getDocs(collection(firebaseDatabase,"/posts"))
    const text = await getDocs(query(collection(firebaseDatabase,"/posts"),where("type","==","text")))
    const image = await getDocs(query(collection(firebaseDatabase,"/posts"),where("type","==","image")))

    const reference = doc(firebaseDatabase,"/meta/postsDeatils/")
    setDoc(reference,{
        totoalPosts:response.size,
        textPosts:text.size,
        imagePosts:image.size
    }) 
}


export const updatePostCounts = async (postAdd:number=1,textPostAdd:number=0,imagePostAdd:number=0) => {
    const response = await getDoc(doc(firebaseDatabase,"/meta/postsDeatils"))
    const data = response.data()
    return updateDoc(doc(firebaseDatabase,"/meta/postsDeatils"),{
        totoalPosts:data.totoalPosts + postAdd,
        textPosts:data.textPosts + textPostAdd,
        imagePosts:data.imagePosts + imagePostAdd
    })
}


export const setUserPostCounts = async () => {
    const response = await getDocs(collection(firebaseDatabase,"/posts/"))

    for(const e of response.docs){

            const data = e.data()
            const userID = data.uid
            const type = data.type;
            const textPost = data.type === "text" ? 1 : 0
            const imagePost = data.type === "image" ? 1: 0

            const users = await getDocs(query(collection(firebaseDatabase,"/userPostCounts/"),where("uid","==",userID)))
            

            if(!users.docs || !users.docs[0] || !users.docs[0].data()){
                const newUser:IFirebaseUserPostCount = {
                    imagePostCount:imagePost,
                    textPostCount:textPost,
                    totalPostCount:1,
                    uid:userID
                }
                try{
                    const newOne= await addDoc(collection(firebaseDatabase,"/userPostCounts/"),newUser);
            
                }catch(ex){
                    console.log(ex)
                }
                
            }else{

                const data:IFirebaseUserPostCount = users.docs[0].data() as IFirebaseUserPostCount;
                data['imagePostCount'] += imagePost;
                data['textPostCount'] +=textPost;
                data['totalPostCount'] += 1;
                const userPostConfigId = users.docs[0].id
                
                try{
                    // @ts-ignore
                const u = await setDoc(doc(firebaseDatabase,"/userPostCounts/"+userPostConfigId),data)
                }catch(ex){
                    console.log(ex)
                }
            }

    }

}




export const updateUserPostCount = async (uid:string,postType:PostType) => {

    const q = query(collection(firebaseDatabase,"/userPostCounts"),where("uid","==",uid))
    const data = await getDocs(q)

    const imagePostCount = postType === PostType.IMAGE ? 1 : 0;
    const textPostCount = postType === PostType.Text ? 1:0
    
    if(!data.docs[0] || !data.docs[0].data()){
        const data:IFirebaseUserPostCount = {
            uid,
            imagePostCount,
            textPostCount,
            totalPostCount:1
        }
        await addDoc(collection(firebaseDatabase,"/userPostCounts"),data)
        return;
    }else{
        const userData = data.docs[0].data() as IFirebaseUserPostCount
        const id = data.docs[0].id;
        userData['imagePostCount'] += imagePostCount;
        userData['textPostCount'] += textPostCount;
        userData['totalPostCount'] +=1;
        await updateDoc(doc(firebaseDatabase,"/userPostCounts/"+id),userData as any)
        return;
    }
}