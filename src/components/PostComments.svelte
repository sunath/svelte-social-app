<script type="ts">
import Button from "@smui/button";
import Dialog, { Content } from "@smui/dialog";
import Textfield from "@smui/textfield";
import { addAComment ,getCommentsOfAPost} from "../api/Comments";
import { onDestroy, onMount } from "svelte";
import VirtualScroll from "svelte-virtual-scroll-list";
import type { ICommentModel } from "../lib/ICommentModel";
import { startWith } from "rxjs";
import UserCommentComponent from "./UserCommentComponent.svelte";


    export let postid;
    export let currentUserId;
    export let userImageURL,username;

    const postCommentsObserver = getCommentsOfAPost(postid).pipe(startWith([]))

    $: userImageModifiedUrL = (userImageURL as string).endsWith(",") ? (userImageURL as string).slice(0,userImageURL.length-1) : userImageURL;


    let loadingObserverReference,loadingObserverSubscription;


    onMount(() => {
        const observer = new IntersectionObserver((e) => {
            console.log(e[0])
        },{
            root:null,
            rootMargin:"0px",
            threshold:0.7
        })

        // observer.observe(loadingObserverReference)
        loadingObserverSubscription = observer;
        
    })

    onDestroy(() => {
        // loadingObserverSubscription.destroy()
    })

    export let shouldShowComments = false;

    let userCommentContent = "";

    let commentActionAvaliable = true;

    const addNewComment = () => {
        

        commentActionAvaliable = false;
        const data:ICommentModel = {
            content:userCommentContent,
            createdAt:Date(),
            updatedAt:Date(),
            postId:postid,
            uid:currentUserId,
            userImageURL,
            username,
        }
        userCommentContent = ""

        addAComment(data).then(e => {
            commentActionAvaliable = true;
            
        }).catch(e => {
            console.log(e)
        })
    }
</script>





<div>

    <Button variant="{"outlined"}" on:click={() => {shouldShowComments = !shouldShowComments;}}>Comments</Button>

<br />

{#if shouldShowComments}
<Dialog 
fullscreen
bind:open={shouldShowComments}

>

    <Content>
        <div class="comments">

            <div class="newComment" style="display:flex;align-items:end;justify-content:space-around;">
                <Textfield bind:value={userCommentContent} label="Add your comment" style="width:80%;"></Textfield>
                <Button disabled={!commentActionAvaliable} on:click={addNewComment}>Comment</Button>
            </div>


            <div class="comments">
                {#each $postCommentsObserver as comment}
                    <UserCommentComponent
                    commentContent={comment.content},
                    commentCreatedAt={comment.createdAt},
                    commentUserId={comment.uid},
                    commentUserName={comment.username},
                    commentUserPhotoURL={userImageModifiedUrL}
                
                    >

                    </UserCommentComponent>
                {/each}
            </div>


        </div>
    </Content>

</Dialog>
    
{/if}


</div>


<style>
    .comments{
        margin:2em;
        height: 60vh;

    }
</style>



