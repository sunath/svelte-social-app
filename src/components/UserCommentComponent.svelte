<script type="ts">
    
import Card, { Content } from '@smui/card';
import CommonCardHeader from './CommonCardHeader.svelte';

    export let commentUserId;
    export let commentUserName;
    export let commentContent;
    export let commentCreatedAt;
    export let commentUserPhotoURL;


    $: username = commentUserName.slice(0,commentUserName.length-1)

    $: userId = commentUserId.slice(0,commentUserId.length-2)
</script>


<Card variant="{"outlined"}" padded>

    <div style="display:flex;align-items:center;">
       <CommonCardHeader
       ownerName={commentUserName}
       userId={userId}
       >

       </CommonCardHeader>
    </div>

    <Content>
        {commentContent}
    </Content>
</Card>


