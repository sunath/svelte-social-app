
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
import UserProfileShower from "./routers/UserProfileShower.svelte";
import { getUserProfileData } from "./api/User";
import { setFirebasePostCount, setUserPostCounts } from "./functions/setFirebaseConfig";

    firebaseAuth.onAuthStateChanged(async (user) => {
      if(!user){
        navigate("/not-authenticated")
      }else{
        try{
        const response = await getUserProfileData(user.uid)
        if(!response){
          navigate("/u/profile")
        }
        }catch(ex){

        }
      }

      authUser.set(user)
    });


</script>


<Router url={url}>
    <Navbar />
    
    <Route path="/u/posts/:id" let:params>
      <UserProfileShower id={params.id}/>
    </Route>

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