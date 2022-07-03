

<script>
    export let content;
    export let uid;
    export let createdAt;
    export let updatedAt;
    export let ownerName;
    export let ownerPhotoURL;
    export let postId;

    export let currentUserId,currentUserPhotoURL,currentUserName;


    $: userId = uid ? uid.slice(0,uid.length - 1) : uid;


    import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
    Actions
  
  } from '@smui/card';
import { onDestroy, onMount } from 'svelte';
import PostCardHeader from "./CommonCardHeader.svelte";
import PostComments from './PostComments.svelte';


let mainReference,intersectionObserver,intersectingType="un__focused__card";

onMount(() => {
  const observer = new IntersectionObserver((e) => {
    const result = e[0]
    console.log(result)
    if(result.isIntersecting){
      intersectingType = "focused__card";
    }else{
      intersectingType = "un__focused__card"
    }
  },{
    threshold:1
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



<div class="card-container {intersectingType}" bind:this={mainReference}>
    <Card style="z-index:0;position:initial;">
      <div style="padding: 1rem;">
      
        <PostCardHeader
        ownerName={ownerName}
        userId={userId}
        >

        </PostCardHeader>
        
        <h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
            {createdAt.split(" ").splice(0,4).join(" / ")}
        </h3>
      </div>

      <Content class="mdc-typography--body2">
        {content.substr(0,content.length - 1)}
      </Content>


      <Actions>
        
        <PostComments
        userImageURL={currentUserPhotoURL}
        username={currentUserName} 
        currentUserId="{currentUserId}" 
        postid={postId}>
        </PostComments>
      </Actions>
    </Card>
  </div>

