<script type="ts">
import Button from "@smui/button";
import IconButton from "@smui/icon-button";
import { createEventDispatcher } from "svelte";
import Textfield from "@smui/textfield"
import {addAImagePost} from "../api/Posts"
import type { IImagePostModel } from "src/lib/IPostModel";


    const dispatch = createEventDispatcher()

    let image,fileInputReference,file;
    let newPostContent = "";

    export let uid;
    export let ownerName;
    export let ownerPhotoURL;

    let createButtonActive = true;

    const newFileSelected = (e) => {
        const newfile = e.target.files[0]

        if(newfile){
            file = newfile;
            const reader = new FileReader()
            reader.readAsDataURL(newfile);
            reader.onload = e => {
                image =  e.target.result;
            }
        }

    }


    const addNewImagePostToServer = () => {

        createButtonActive = false;

        const postDels:IImagePostModel = {
            createdAt:Date(),
            updatedAt:Date(),
            uid,
            content:newPostContent,
            imageURL:image,
            ownerName,
            ownerPhotoURL,
            type:"image"
        }


        addAImagePost(postDels,file).then(e => {
            
            createButtonActive = true;
            dispatch('close')
        }).catch(e => {
            console.log(e)
        })

    }


</script>



<style>
    .photo-upload{
        display: grid;
        place-items: center;
    }

    .photo-post-create{
        display: grid;
        place-items: center;
    }
</style>


<IconButton class="material-icons" on:click={() => {dispatch('back')}}>arrow_back</IconButton>


<input type="file" style="display:none;"  bind:this={fileInputReference} on:change="{newFileSelected}">

<br />
{#if !image}

    <div class="photo-upload">
        
        <Button variant="raised" on:click={() => {fileInputReference.click()}}>Upload your image</Button>
    </div>


{:else}


<div class="photo-post-create">
 
    <img src="{image}" alt="No Image" on:click={() => {fileInputReference.click()}} style="max-width:{window.innerWidth - window.innerWidth * 0.1}px;margin-bottom:1em;">
            <Textfield
        style='width:100%;max-width:{window.innerWidth}px;'
        class="user__input"
        textarea
        label="Your post content"
        bind:value={newPostContent}
        >
        </Textfield>


        <Button color={"secondary"} variant="raised" style="margin:1em;" on:click={addNewImagePostToServer} disabled={!createButtonActive}>Create</Button>

</div>
    
{/if}


