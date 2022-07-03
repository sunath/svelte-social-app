

<script type="ts">
import { getUserProfileData, setUserProfile, updateUserProfile } from "../api/User";

import { authUser } from "../store/user_auth";
import CircularProgress from "@smui/circular-progress"
import Textfield from "@smui/textfield";
import {formatedCountries} from '../api/Countries'
import Autocomplete from "@smui-extra/autocomplete"
import Button from "@smui/button";
import Select, { Option } from '@smui/select';
import { navigate } from "svelte-routing";

    let user;

    const userSubscription =  authUser.subscribe(e => {
        user  = e;
    })

    $: userProfileData = user ?  getUserProfileData(user.uid) : null;


    let firstname = "" ,lastname="",bio = "",username="";
    let country:string | undefined = undefined;
    let userGender:string | undefined = undefined;


    let isRequesting = false;
    const saveUserProfile = async () => {
        isRequesting = true;
        if(!userProfileExists){
            await  setUserProfile({
                    firstname,
                    country,
                    userGender,
                    lastname,
                    bio,
                    uid:user.uid,
                    username
                })
      }else{
        updateUserProfile(user.uid,{
            firstname,
                    country,
                    userGender,
                    lastname,
                    bio,
                    uid:user.uid,
                    username  
        });
      }
    

    isRequesting = false;


    setTimeout(() => {
        navigate("/")
    },1000)

    }


    let usernameDisable = false;
    
    let userProfileExists = false;


    const setFormData = (data) => {
        if(!data){
            return "";
        }
        firstname = data.firstname
        lastname = data.lastname
        userGender = data.userGender
        bio = data.bio
        username = data.username
        country = data.country
        usernameDisable = true;
        userProfileExists = true;
        return "";
    }


</script>


{#if userProfileData}

    {#await userProfileData}
        <div style="display:grid;place-items:center;height:50vh;">
            <CircularProgress style="height:64px;width:64px;" indeterminate></CircularProgress>
        </div>
    {:then data}
        

    {setFormData(data)}

    <div class="user__profile__setup">
        <h1 style="text-align:center;margin-top:2em;">{data ? "Update" : "Setup"} your user profile</h1>
        <Textfield bind:value="{firstname}" label="First name" style="width:100%;margin:1em;"></Textfield>
        <Textfield bind:value="{lastname}" label="Last name" style="width:100%;margin:1em;"></Textfield>
        <Textfield bind:value="{username}" disabled={usernameDisable}  label="User name" style="width:100%;margin:1em;"></Textfield>
        <Autocomplete bind:value="{country}" options={formatedCountries} placeholder="Your Country" label="Your Country" style="margin:1em;"></Autocomplete>
        <Textfield
        textarea
        style="width:100%;margin:1em;"
        bind:value={bio}
        label="Your bio goes here"
        >
        </Textfield>

        <Select  bind:value={userGender} style="margin:1em;" label="Gender">
            {#each ["male","female","no"] as gender}
                <Option value={gender}>{gender.toLocaleUpperCase()}</Option>
            {/each}
        </Select>

        <div style="width:100%;display:grid;place-items:center;">
            <Button variant="{"unelevated"}" style="margin:auto;" on:click={saveUserProfile} disabled={isRequesting}>{data ? "change" : "setup"}</Button>
        </div>
        
    </div>
   


    {/await}
    
{/if}


<style>

    .user__profile__setup{
        width: 80%;
        margin: auto;

    }
</style>