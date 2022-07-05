

<script type="ts">


    export let userId,ownerName;
    import { getUserProfileImageById } from "../api/User";
    import Skeleton from "svelte-skeleton/Skeleton.svelte";
import { navigate } from "svelte-routing";


    const userProfileImageP = getUserProfileImageById(userId)
    export let uid;

    const navigateUser = () => {
      navigate("/u/posts/"+uid)
    }

</script>

<div class="card-header" on:click="{navigateUser}">
        
    {#await userProfileImageP}
    <Skeleton height="{30}" width="{30}">
        <circle cx="10" rx="10" r="10"> </circle>
    </Skeleton>
    {:then url} 
      <img src={url} alt="user_photo" class="user_photo" >  
    {/await}
    
    <h2 class="mdc-typography--headline6 post__username">{ownerName} </h2>
  </div>

  <style>
        .card-header{
      display: flex;
      width: 50%;
      align-items: center;
      cursor: pointer;
    }


    .user_photo{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .post__username{
        margin-left: 1em;
    }

  </style>