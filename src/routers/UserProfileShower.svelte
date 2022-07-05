<script>
import { authUser } from "../store/user_auth";
import UserProfile from "../components/UserProfile.svelte";

    export let id;



</script>



<UserProfile
uid={id}
>

</UserProfile>

