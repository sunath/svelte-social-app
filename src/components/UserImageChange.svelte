<script type="ts">
 import Dialog, { Title, Content, Actions } from '@smui/dialog';
 import Button, { Label } from '@smui/button';
import { createEventDispatcher } from 'svelte';
import { getUserProfilePictureByUrl, replaceUserImage } from '../api/User';
import { doc } from 'firebase/firestore';

 export let show:boolean = false;
 export let currentImageURL;
 export let uid;
let userImageFileInput;


 let nextUserProfile,nextUserProfileFile;


 let disableActions = false;
 
 const saveUserImage = async () => {
    disableActions = true;
    await replaceUserImage(uid,nextUserProfileFile)
    disableActions = false;
    dispatch('close')
    location.reload()
 }

 const dispatch = createEventDispatcher()


 const onNewUserProfile = (e) => {
    const temp =  e.target.files[0]
    if(temp){
        nextUserProfileFile = temp;
        const reader = new FileReader()
        reader.readAsDataURL(nextUserProfileFile)
        reader.onload = (e) => {
            nextUserProfile = e.target.result
        }
    }


    
 }

 $: userImagePromise = getUserProfilePictureByUrl(currentImageURL)

</script>



<Dialog
bind:open={show}
fullscreen
escapeKeyAction=""
scrimClickAction=""
>

<Content>
    <h1 style="text-align:center;margin-top:1em;">Change your profile</h1>

    {#if nextUserProfile}
    <div class="previous-profile" style="height:30vh;display:grid;place-items:center;">
        <img src="{nextUserProfile}" alt="" style="max-width:150px;max-height:150px;border-radius:50%;overflow:hidden;">
    </div>

    <div style="display:grid;place-items:center;">
        <input type="file" style="display:none;" bind:this={userImageFileInput} on:change="{onNewUserProfile}">
        <Button variant={"raised"} style="text-align:center;" on:click={() => {saveUserImage()}} disabled={disableActions}>Save</Button>
    </div>

    {:else}

    <div class="previous-profile" style="height:30vh;display:grid;place-items:center;">

        {#await userImagePromise}
            
        {:then u} 
        <img src="{u}" alt="" style="max-width:150px;max-height:150px;border-radius:50%;">    
        {/await}
        


    </div>
    
    <div style="display:grid;place-items:center;">
        <input type="file" style="display:none;" bind:this={userImageFileInput} on:change="{onNewUserProfile}">
        <Button variant={"raised"} style="text-align:center;" on:click={() => {userImageFileInput.click()}} disabled={disableActions}>Change</Button>
    </div>


    {/if}
    


    
   
    
    
</Content>

<Actions>
    <Button on:click={ () => {dispatch('close',{})} } disabled={disableActions}>Close</Button>
</Actions>

</Dialog>


