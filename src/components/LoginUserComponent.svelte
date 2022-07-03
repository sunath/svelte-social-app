


<script type="ts">
    import Button from "@smui/button";
import { navigate } from "svelte-routing";
import { loginWithGoogle } from "../firebase";

import type {SnackbarComponentDev} from "@smui/snackbar"
import Snackbar,{Label} from "@smui/snackbar"

    let snackBarMessage:SnackbarComponentDev;

    let message  = "";


    const login =  () => {
         loginWithGoogle().then(e => {
            message = "logged in successfully"
            setTimeout(() => {
                navigate("/")
            },1000)
            
         }).catch(ex => {
            message = "login failed"
         }).finally(() => {
            snackBarMessage.open()
         })
    }

</script>





<div class="login__user__container">


    <Snackbar bind:this={snackBarMessage} >
        <Label>{message}</Label>
    </Snackbar>

    <div class="login__conatiner">
        <Button variant="{"raised"}" on:click={login}>Login With Google to continue</Button>
    </div>

    
  
</div>


<style>
    .login__user__container{
        position:absolute;
        height:100vh;
        top: 0;
        width:100%;
        background-image: url("../../public/loginPage3.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }

    .login__conatiner{
        height: 100vh;
        display: grid;
        place-content: center;
    }



</style>