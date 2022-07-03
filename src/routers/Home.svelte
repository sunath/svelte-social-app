<script>
import UserSearchComponent from "../components/UserSearchComponent.svelte";
import Posts from "../components/Posts.svelte";
import SideNavbar from "../components/SideNavbar.svelte";

</script>







<style>
    .home__main__conatiner{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }

    .side-nav{
        width:20%;
    }

    .posts{
        width: 75%;
    }

    @media (max-width: 1000px){
        .side-nav{
            display: none;
        }
    }

</style>


<UserSearchComponent></UserSearchComponent>

<div class="home__main__conatiner">

   
    <div class="side-nav">
        <SideNavbar></SideNavbar>
    </div>


    <div class="posts">
        <Posts>
    
        </Posts>
    </div>
    
</div>
