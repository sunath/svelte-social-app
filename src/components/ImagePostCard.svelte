

<script>
    export let content;
    export let uid;
    export let createdAt;
    export let updatedAt;
    export let ownerName;
    export let ownerPhotoURL;
    export let imageUrL;
    export let postId;
    import {getAImagePostImageUrL} from "../api/Posts"

    import {fade} from "svelte/transition"

    import Skeleton from "svelte-skeleton/Skeleton.svelte"

    let newImageURL;
    let newImageObject;


    $: userId = uid ? uid.slice(0,uid.length-1) : uid;

    onMount(async () => {
        // imageUrL = await  getAImagePostImageUrL(imageUrL)
        // console.log(imageUrL)
        // newImageObject = new Image(600,600)
        // newImageObject.src = imageUrL;
        // newImageObject.onload = (e) => {
        //   console.log(e)
        //   console.log("new image object loaded")
        //   imageLoaded = true;
        // }
    })

    const getLoadedImage = (src) => {
      return new Promise((resolve,reject) => {
        const imageObject = new Image(600,600)
        imageObject.src = src;
        imageObject.onload = (e) => {
          resolve(src)
        }
      })
    }

    let imageLoaded = false;


    import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
Actions,
  
  } from '@smui/card';
import { onDestroy, onMount } from 'svelte';
import { getMultiFactorResolver, RecaptchaVerifier } from "firebase/auth";
import PostComments from "./PostComments.svelte";
import { getUserProfileImageById } from "../api/User";
import PostCardHeader from "./CommonCardHeader.svelte";


    const userProfilImageP = getUserProfileImageById(userId)


    let cardWith,cardHeight;


    let mainReference,intersectionObserver,intersectingType="un__focused__card";

    onMount(() => {
      const observer = new IntersectionObserver((e) => {
        const result = e[0]
        if(result.isIntersecting){
          intersectingType = "focused__card";
        }else{
          intersectingType = "un__focused__card"
        }
      },{
        threshold:.6
      })

      observer.observe(mainReference)
      intersectionObserver = observer;
    })

    onDestroy(() => {
      intersectionObserver.unobserve(mainReference)
    })

    

</script>




<style>

  .card-container{
    transition: all .5s ease-out;
  }

  .un__focused__card{
    opacity: 0.2;
  }

  .focused__card{
    opacity: 1;
  }

</style>


<div class="card-container {intersectingType}" bind:clientWidth="{cardWith}" bind:clientHeight={cardHeight} bind:this={mainReference}>
    <Card style="z-index:0;position:initial;">
      <div style="padding: 1rem;">
        <PostCardHeader
        ownerName={ownerName}
        userId={userId}
        ></PostCardHeader>
       
        
        <h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
            {createdAt.split(" ").splice(0,4).join(" / ")}
        </h3>
      </div>


      <Content class="mdc-typography--body2">
        {content.substr(0,content.length - 1)}
      </Content>

      <Media style="height:400px;width:100%;max-height:400px;">
        <!-- {#if !imageLoaded}
        <Skeleton height="{360}" width="{360}">
        </Skeleton>

        {:else}
        <img src="{imageUrL}" style="max-width: 100%;">
        {/if} -->

        {#await getAImagePostImageUrL(imageUrL)}
        <Skeleton width="{cardWith}" height="{400}">
        </Skeleton>
          
        {:then x}
        
        {#await getLoadedImage(x)}

        <Skeleton height="{400}" width="{cardWith}">
        </Skeleton>
          
        {:then x}
        <img src="{x}" alt="" style="max-width:100%;width:100%;height:400px;"> 
          
        {/await}
          
        {/await}
        
      </Media>



      <Actions>
        <PostComments 
        currentUserId={uid}
        postid={postId}
        userImageURL={ownerPhotoURL}
        username={ownerName}
        >

        </PostComments>
      </Actions>

    </Card>
  </div>
