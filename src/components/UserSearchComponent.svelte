<script>
import Textfield from "@smui/textfield";


let currentSearchUsername = "";

</script>

<div style="position:sticky;top:10%;z-index:101;display:grid;place-items:center;width:30%;margin:1em auto 1em auto;">
    <Textfield style="width:100%;" bind:value={currentSearchUsername} label="Search a user" variant="{"filled"}"></Textfield>
</div> 

<style>

</style>
