


<header>
    
    <nav>
        <div class="left">
         
            <div class="title">SM-DEMO</div>
        </div>

        <div class="right">

            {#if user}
            <Button class="material-icons" on:click={() => {menu.setOpen(true)}} color={"secondary"}  ripple={false}>

                {#await userProfilePictureFn}
                    <Skeleton width={24} height={24} speed={1000}>
                        <rect width="24" height="24" x="0" y="0" rx="12" ry="12" />
                    </Skeleton>
                {:then url} 
                    <img src={url} alt="user_photo" class="user__profiles">        
                {/await}
            
            </Button> 




            {:else}
            <IconButton class="material-icons" on:click={() => {menu.setOpen(true)}} color={"secondary"}  ripple={false}>person</IconButton> 
            {/if}
            

            <div use:clickOutside on:click_outside={closeMenu}>
                <Menu bind:this={menu}>
                    <List>
                        {#if user}

                        <Item on:SMUI:action={() => {createANewPost = true;}}>
                            <Text>New post</Text>
                        </Item>

                        <Item>
                            <Text>My Posts</Text>
                        </Item>

                        <Item on:SMUI:action = {() => {openUserProfileChange=true}}>
                            <Text>Change Profile</Text>
                        </Item>

                        <Separator></Separator>

                        <Item on:SMUI:action = {logout}>
                            <Text>Logout</Text>
                        </Item>

                        {:else}
                        <Item on:SMUI:action = {loginWithGoogle}>
                            <Text>Login</Text>
                        </Item>

                        {/if}
                        
                    </List>
                </Menu>
            </div>
        </div>
    </nav>
</header>




<NewPost  show={createANewPost} on:closeNewPost={() => {createANewPost = false;}}></NewPost>



{#if user}

<UserImageChange
uid={user.uid}
show={openUserProfileChange} 
on:close={() => {openUserProfileChange=false;}}
currentImageURL={user.photoURL}
>
</UserImageChange>
    
{/if}


<style>

    .left{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .user__profiles{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
    header{
        position: sticky;
        width: 100%;
        height: 100%;
        background-color: #2C73D2;
        padding: 1em 0 1em 0;
        top:0;
        z-index: 100;
    }

    nav{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .title{
        color: #fff;
    }

</style>




<script type="ts">
    import type {MenuComponentDev} from "@smui/menu";
    import NewPost from "./NewPost.svelte";
    import Button from "@smui/button";
    import {clickOutside} from "../utils/clickOutSide"
    import IconButton from "@smui/icon-button"
    import Menu from "@smui/menu";
    import List,{ Item, Separator, Text } from "@smui/list";
    let menu:MenuComponentDev;
    import {authUser} from '../store/user_auth'
    import {loginWithGoogle,logout} from "../firebase"
    import { onDestroy } from "svelte";
    import UserImageChange from "./UserImageChange.svelte"
import { getUserProfilePictureByUrl } from "../api/User";
import UserSearchComponent from "./UserSearchComponent.svelte";

import Skeleton from "svelte-skeleton/Skeleton.svelte"



    


    let openUserProfileChange = false;





    function closeMenu(event:any) {
        menu.setOpen(false)
    }

    let user;

    const authSubscriptin = authUser.subscribe(e => {
        user = e;
    })

    $: userProfilePictureFn = user ? getUserProfilePictureByUrl(user.photoURL) : getUserProfilePictureByUrl("/users/images/default.png")

    onDestroy(() => {
        authSubscriptin()
    })

    let createANewPost = false;




</script>
