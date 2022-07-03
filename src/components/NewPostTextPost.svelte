





<script type="ts">
    import IconButton from "@smui/icon-button";
    import Button from '@smui/button'
    import Textfield from "@smui/textfield"
    import { createEventDispatcher } from "svelte";
    import type {IPostModel} from "../lib/IPostModel";
    import {addNewPost} from "../api/Posts"
    import { navigate } from "svelte-routing";
  
    export let userId;
    export let photoURL;
    export let displayName;

    export let canGoBack=true;

    const dispatch = createEventDispatcher()
    let newPostContent = "";


    let postCreating = false;

   async function createNewTextPost(){

        postCreating = true;
        const nextPost:IPostModel = {
            content:newPostContent,
            createdAt:new Date(),
            updatedAt:new Date(),
            uid:userId,
            type:"text",
            ownerName:displayName,
            ownerPhotoURL:photoURL
        }


        try{

        await addNewPost(nextPost)
        dispatch('close')
        postCreating = false;
        }catch(ex){

            console.log('error')
            console.log(ex);
            postCreating = false;
            
        }
    }

</script>

{#if canGoBack}
    <IconButton class="material-icons" on:click={() => {dispatch('back')}}>arrow_back</IconButton>    
{/if}



<br>


<div class="user__input__root">
    <Textfield
    style='width:100%;'
    class="user__input"
    textarea
    label="Your post content"
    bind:value={newPostContent}
    >
    </Textfield>

    <Button variant='raised' on:click={createNewTextPost} disabled={postCreating} >Create</Button>
</div>





<style>
    .user__input__root{
        width: 100%;
        height: 30vh;
        display: grid;
        place-items: center;
    }

    


</style>