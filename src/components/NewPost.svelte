
<script>
import { createEventDispatcher, onDestroy } from "svelte";
import  Dialog,{Actions,Content,Header,Title} from "@smui/dialog"
import Button from "@smui/button";
import NewPostTextPost from "./NewPostTextPost.svelte";
import { authUser } from "../store/user_auth";
import NewImagePost from "./NewImagePost.svelte";

        let currentUser;
        const authUserSubscription = authUser.subscribe(e => {
            currentUser = e;
        })

        onDestroy(() => {
            authUserSubscription()
        })

    export let show;

    const dispatch = createEventDispatcher()
    function closeNewPost(){
        dispatch("closeNewPost",{})
        show=false;
    }


    let postType = "";



    function createSelectionFunction(typeName){
        return () => {postType = typeName}
    }


    function resetSelectionType(){
        postType = ""
    }
</script>


<style>
    .post__type__selection{
        height: 40vh;
        display: grid;
        place-content: center;
    }

    .selection__button{
        margin-top: 2em;
        margin-bottom: 1em;
    }


</style>



<Dialog bind:open={show} fullscreen>

    <Header>
        <Title>Create your post</Title>
    </Header>

    <Content>
        
        {#if !postType}
        <div class="post__type__selection">
            <Button class="selection__button" on:click={createSelectionFunction("text")}>Text</Button>
            <Button class="selection__button" on:click={createSelectionFunction("image")}>Image</Button>
            <Button class="selection__button" on:click={createSelectionFunction("video")}>Video</Button>
        </div>
        {/if}

        {#if postType=="text"}
                <NewPostTextPost 
                on:back={resetSelectionType} on:close={closeNewPost} 
                userId={currentUser.uid}
                displayName={currentUser.displayName}
                photoURL={currentUser.photoURL}
                ></NewPostTextPost>

        
        {:else if postType === "image"}
            <NewImagePost 
            ownerName={currentUser.displayName}
            ownerPhotoURL={currentUser.photoURL}
            uid={currentUser.uid}
            on:back={resetSelectionType}
            on:close={closeNewPost}
            >

            </NewImagePost>
        {/if}



        

    </Content>

    <Actions>
        {#if !postType}
            <Button variant="raised" on:click={closeNewPost}>Close</Button>    
        {/if}
        
    </Actions>


</Dialog>
