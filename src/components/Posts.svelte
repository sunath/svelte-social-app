

<script type="ts">

    import {collection,getDoc,doc} from "firebase/firestore"
    import {firebaseDatabase} from '../firebase'
    import {authUser} from "../store/user_auth"

    import {getNormalPosts} from "../api/Posts"
import TextPostCard from "./TextPostCard.svelte"
import {startWith} from 'rxjs'
import ImagePostCard from "./ImagePostCard.svelte";
import { onDestroy } from "svelte"
import CirculaProgress from "@smui/circular-progress"


    let posts = getNormalPosts().pipe(startWith([]))

    let normalPosts = [],loading=true;

    const postsSubscription = posts.subscribe(e => {
        normalPosts = e
        loading = false;
        console.log(e.sort((a,b) => {
            if(a > b)return 1;
            else if(a<b)return -1;
            return 0;
        }))
       
    })

    let currentUserId,currentUsername,currentUserImageUrL;
    let currentUserSubscription = authUser.subscribe(e => {
        if(e){
            console.log(e)

            currentUserId = e.uid;
            currentUsername = e.displayName;
            currentUserImageUrL = e.photoURL
        }
    }) 


    onDestroy(() => {
        currentUserSubscription()
        postsSubscription.unsubscribe()
    })

</script>




{#if loading}
<div style="display:flex;align-items:center;justify-content:space-around;height:80vh;">
    <CirculaProgress style="height:64px;width:64px;" indeterminate>

    </CirculaProgress>
</div>

{/if}

  


{#each $posts as post}

<div class="post__conatiner"> 
    {#if post.type==="text"}
    
  
        <TextPostCard
        currentUserName={currentUsername}
        currentUserPhotoURL={currentUserImageUrL}
        postId={post.id}
        currentUserId={currentUserId}
        content={post.content},
        createdAt={post.createdAt},
        ownerName={post.ownerName},
        ownerPhotoURL={post.ownerPhotoURL},
        uid={post.uid},
        updatedAt={post.updatedAt}
        >

        </TextPostCard>





    {:else if post.type==="image"}


    

    <ImagePostCard
    postId={post.id}
    imageUrL={post.imageURL}
    content={post.content},
    createdAt={post.createdAt},
    ownerName={post.ownerName},
    ownerPhotoURL={post.ownerPhotoURL},
    uid={post.uid},
    updatedAt={post.updatedAt}
    >

    </ImagePostCard>



       
    {/if}


    
</div>

   
{/each}



<style>
    .post__conatiner{
        max-width: 600px;
        max-height: 600px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2em;
        margin-bottom: 2em;
        z-index: 0;
        padding: 1em;
    }
</style>