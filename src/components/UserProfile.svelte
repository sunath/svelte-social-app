

<script type="ts">
import { getUserProfileData, getUserProfileImageById } from "../api/User";
import Skeleton from "svelte-skeleton/Skeleton.svelte";
import {getPostsOfSpecificUser} from "../api/Posts"
import {fade} from "svelte/transition"
import Posts from "./Posts.svelte";
import IconButton from "@smui/icon-button";
import { navigate } from "svelte-routing";

    export let uid;

    $: userImageURL = uid && getUserProfileImageById(uid)

    const userProfileData = getUserProfileData(uid)

    let userPosts;

    const userPostsSubscription = getPostsOfSpecificUser(uid).subscribe(e => {
        userPosts = e;
    });

    let isPorfileLoaded:boolean = false;

    const setPorfileLoaded = () => {
        isPorfileLoaded = true;
        return "";
    }

</script>

<div class="navigation" style="margin:2em;position:sticky;top:10%;z-index:100;">
    <IconButton class="material-icons" on:click={() => {navigate("/")}}>arrow_back</IconButton>
</div>



{#if userImageURL}
    {#await userImageURL}
    <!-- <Skeleton width="{600}" height={600}>

        <ellipse rx="115.65762" ry="110.229645" transform="translate(320 136.116911)" fill="#e3e3e3" stroke-width="0"/>

        <rect width="432.56785" height="149.47808" rx="0" ry="0" transform="matrix(1 0 0 0.243476 103.716075 285.816701)" fill="#e6e8ec" stroke-width="0"/><rect width="432.56785" height="149.47808" rx="0" ry="0" transform="matrix(1 0 0 0.243476 103.716075 351.426801)" fill="#e6e8ec" stroke-width="0"/>

    </Skeleton> -->

    <div style="width:100%;display:grid;place-items:center;margin-top:3em;">
        <Skeleton width="{600}" height={600}>

            <ellipse rx="57.82881" ry="55.1148225" transform="translate(320 68.0584555)" fill="#e3e3e3" stroke-width="0"/>
    
            <rect width="432.56785" height="80" rx="0" ry="0" transform="matrix(1 0 0 0.243476 103.716075 142.9083505)" fill="#e6e8ec" stroke-width="0"/>
            
            <rect width="432.56785" height="80" rx="0" ry="0" transform="matrix(1 0 0 0.243476 103.716075 175.7134005)" fill="#e6e8ec" stroke-width="0"/>
    
        </Skeleton>
    
    </div>

    {:then src}    

    <!-- <Skeleton width="{600}" height={600}>
        <ellipse rx="115.65762" ry="110.229645" transform="translate(320 136.116911)" fill="#e3e3e3" stroke-width="0"/><rect width="432.56785" height="149.47808" rx="0" ry="0" transform="matrix(1 0 0 0.243476 103.716075 285.816701)" fill="#e6e8ec" stroke-width="0"/><rect width="432.56785" height="149.47808" rx="0" ry="0" transform="matrix(1 0 0 0.243476 103.716075 351.426801)" fill="#e6e8ec" stroke-width="0"/>
    </Skeleton> -->


    <!-- 57.82881 55.1148225 -->
    <div style="display:flex;margin-top:3em;" class="user__card" transition:fade>
        <img src="{src}" alt="" style="width:208px;height:200px;border-radius:50%;">

        {#await userProfileData}
        {:then data}
        
        
        <div class="user__details" style="text-align:center;">
            <h1 style="margin:.3em;">{data.username}</h1>
            <h4 style="margin:.2em;">{data.firstname} {data.lastname}</h4>
            <h4 style="margin:1em;">lives in {data.country}</h4>
            <p style="max-width:300px;">{data.bio}</p>
        </div>

        {setPorfileLoaded()}

        {/await}
    </div>



    {/await}
{/if}



{#if isPorfileLoaded}
<Posts isCustomPostData={true} customPostData={userPosts} />    
{/if}





<style>

    .user__card{
        justify-content: space-around;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        width: min(70% , 500px);
        padding: 2em;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 20px;
    }
</style>