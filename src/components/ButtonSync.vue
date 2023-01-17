
<script>

import { useAccountStore } from "../stores/account"

export default {
    data() {
        return {
            account: useAccountStore(),
            accountUrl: "https://strava.com/athlete/" + useAccountStore().accountId,
            synchronizedActivityMessage: ''
        }
    },
    methods: {
        syncAccount() {
            this.account.synchronizeAccount().then(data => {
                let activities = data.data.activities.length;
                this.synchronizedActivityMessage = `You have ${activities} new activities !`;
            }).catch((err)=>{
                this.synchronizedActivityMessage = "Error during synchronization";
            })
        },
        disconnectAccount() {
            this.account.disconnectAccount().then(data => {
                this.account.loggedIn = false
            }).catch(err => {
                alert(err)
            })
        }
    }
};
</script>

<style lang="scss">
span.button-container {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        width: 15vw;
        padding: 10px 40px;
        margin-top: 20px;
    }
    p.activityMessage{
        margin-top: 20px;
    }
}
</style>
<template>
    <a :href="accountUrl">{{ accountUrl }}</a>
    <button type="button" @click="syncAccount" class="btn btn-danger rounded-pill">Sync</button>
    <button type="button" @click="disconnectAccount" class="btn btn-outline-danger rounded-pill">Disconnect</button>
    <p class="activityMessage" v-if="this.synchronizedActivityMessage">{{ synchronizedActivityMessage }}</p>
</template>



