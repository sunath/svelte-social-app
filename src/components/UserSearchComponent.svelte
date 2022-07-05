<script type="ts">
import Autocomplete from "@smui-extra/autocomplete";
import Textfield from "@smui/textfield";
import { navigate } from "svelte-routing";
import { getUsersByUserName } from "../api/User";


let currentSearchUsername = "";

let username:any = "";

let users = []

    
    function navigateUser(){
        navigate(`/u/posts/${username.uid}`)
        return "";
    }
        
    


let searchUser = async (input:string) => {
    if(!input || input.length == 0 || input.trim().length === 0)return false;
    try{
    const data = await getUsersByUserName(input)
    return data;
    }catch(ex){
        console.log(ex)
        return false;
    }
    
}

</script>

<div style="position:sticky;top:10%;z-index:1;display:grid;place-items:center;width:30%;margin:1em auto 1em auto;">
    
    <!-- <Textfield style="width:100%;" bind:value={currentSearchUsername} label="Search a user" variant="{"filled"}"></Textfield>
     -->
     <Autocomplete
    getOptionLabel={(e) =>  e ? e.username  :""}
    bind:value={username}
    label="Search a user"
    search={searchUser}
    options={users}
    textfield$style='width:100%;'
    style="width:100%;"
    textfield$variant="{"filled"}"
     >

     </Autocomplete>

     {#if username}
     {navigateUser()}
        
     {/if}

</div> 

<style>

</style>
