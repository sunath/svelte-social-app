





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

    const dispatch = createEventDispatcher()
    let newPostContent = "";

   async function createNewTextPost(){
        const nextPost:IPostModel = {
            content:newPostContent,
            createdAt:Date(),
            updatedAt:Date(),
            uid:userId,
            type:"text",
            ownerName:displayName,
            ownerPhotoURL:photoURL
        }


        try{

        await addNewPost(nextPost)
        
        
dispatch('close')
        }catch(ex){

            console.log('error')
            console.log(ex);
            
        }
    }

</script>

<IconButton class="material-icons" on:click={() => {dispatch('back')}}>arrow_back</IconButton>

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

    <Button variant='raised' on:click={createNewTextPost}>Create</Button>
</div>



<style>
    .user__input__root{
        width: 100%;
        height: 30vh;
        display: grid;
        place-items: center;
    }

    


</style>