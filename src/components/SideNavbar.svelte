<script type="ts">
    
    import List, {Text,Separator,Graphic,Item} from "@smui/list"
import { navigate } from "svelte-routing";
import NewPost from "./NewPost.svelte";


let newPostOpen = false;
let newPostType:"image" | "text" | null = "text";
</script>


{#key newPostOpen}

<NewPost
on:closeNewPost = {() => {newPostOpen=false;newPostType=null;}} 
show={newPostOpen} 
customOne="{true}" 
customOneType={newPostType}>
</NewPost>

  
{/key}

<div class="side__navbar__conatiner">
    <List class="demo-list"  style="postion:absolute;">
        <Item style="margin:2em;" on:SMUI:action  = { () => {navigate("/u/profile")}}>
          <Graphic class="material-icons">account_circle</Graphic>
          <Text>Profile</Text>
        </Item>

        <Item style="margin:2em;" on:SMUI:action={() => {
          newPostType = "text";
          newPostOpen=true;
          
          }}>
          <Graphic class="material-icons">post_add</Graphic>
          <Text>New Text Post</Text>
        </Item>


        <Item style="margin:2em;"
          on:SMUI:action={() => {
            newPostType= "image";
            newPostOpen = true;
            console.log(newPostType)
          }}
        >
            <Graphic class="material-icons">image</Graphic>
            <Text>New Image Post</Text>
          </Item>



        <Item style="margin:2em;">
            <Graphic class="material-icons">mail</Graphic>
            <Text>Your Posts</Text>
        </Item>


        <Item style="margin:2em;">
            <Graphic class="material-icons">favorite</Graphic>
            <Text>Favorite Posts</Text>
        </Item>

        <Item style="margin:2em;">
            <Graphic class="material-icons">book</Graphic>
            <Text>Saved Posts</Text>
        </Item>

        <Item style="margin:2em;">
          <Graphic class="material-icons">group</Graphic>
          <Text>Friends</Text>
        </Item>
      </List>
</div>







<style>


    .side__navbar__conatiner{
        transform: translateY(150px);
        position: sticky;
        height: 100vh;
        padding: 1em 0 1em 0;
        top:-10%;
        z-index: 1;
    }

    .demo-list{
        padding: 3em;
        background: #e5e5e5;
    }

</style>
