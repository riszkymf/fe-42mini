
<script>

import {useAccountStore} from "../stores/account"
import ButtonConnect from "../components/ButtonConnect.vue"
import ButtonSync from "../components/ButtonSync.vue"
import image from "../assets/pngegg.png"

export default {
  data(){
    return{
      account: useAccountStore(),
      image: image
    }
  },
  methods: {
    syncAccount(){
      this.account.syncAccount().then(data=>{
        window.location.href = data.redirect_uri
      })
    },
    getPageContent(){
      if(this.account.loggedIn){
        return ButtonSync
      } else {
        return ButtonConnect
      }
    }
  }
};
</script>

<style lang="scss">
    span.image-container{
      max-width: 15vw;
      padding-bottom: 2rem;
    }
</style>
<template>
  <div id="pageContent">
    <span class="button-container">
      <span class="image-container">
        <img class="img-fluid" :src="image"/>
      </span>
      <component :is="getPageContent()"></component>
    </span>

  </div>
</template>



