
<svelte:head>
    <!-- Fonts -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
    />
  
    <!-- Material Typography -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/@material/typography@13.0.0/dist/mdc.typography.css"
    />
  
    <!-- SMUI -->
    <link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
  </svelte:head>


<script type="ts">
   
    import Custom from "./Custom.svelte";
    export let url = ""


    import {Link,Router,Route, navigate} from "svelte-routing";
    import Navbar from "./components/Navbar.svelte";
    import {firebaseAuth} from "./firebase";
    import {authUser} from "./store/user_auth"
import Posts from "./components/Posts.svelte";
import Home from "./routers/Home.svelte";
import SideNavbar from "./components/SideNavbar.svelte";
import LoginUserComponent from "./components/LoginUserComponent.svelte";
import SetupProfileRouter from "./routers/SetupProfileRouter.svelte";

    firebaseAuth.onAuthStateChanged((user) => {
      if(!user){
        navigate("/not-authenticated")
      }
      authUser.set(user)
    });

</script>


<Router url={url}>
    <Navbar />
    <Route path="/u/profile" component={SetupProfileRouter} />
    <Route path="/not-authenticated" component={LoginUserComponent}/>
    <Route path="/" component={Home}/>
</Router>


<style>
    *{
        margin: 0;
        padding: 0;
    }
</style>