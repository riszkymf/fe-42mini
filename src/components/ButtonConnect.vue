
<script>

import {useAccountStore} from "../stores/account"

export default {
  data(){
    return{
      account: useAccountStore()
    }
  },
  methods: {
    connectAccount(){
      this.account.connectAccount().then(data=>{
        window.location.href = data.data.redirect_uri
      }).catch(err=>{
        console.error(err.message)
      })
    }
  }
};
</script>
<template>
    <button type="button" @click="connectAccount" class="btn btn-danger rounded-pill">Connect</button>
</template>



