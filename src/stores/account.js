import {defineStore} from 'pinia';
import axios from 'axios';




export const useAccountStore = defineStore("account",{
    state: ()=>({
            loggedIn: localStorage.getItem('42_IS_LOGGED_IN'),
            accountId: false
    })
    ,
    actions: {    
        getToken(){
            return localStorage.getItem('42_token')
        },
        async connectAccount(){
            try {
                let response = await axios.get('/api/connect')
                return response.data
            } catch (error) {
                alert(error.message)
                console.error(error.message)
                return error
            }
        },
        async disconnectAccount(){
            try {
                let response = await axios.get('/api/disconnect',{
                    headers: {
                        Authorization: "Bearer " + this.getToken()
                    }
                })
                this.cleanupStorage()
                return response.data
            } catch (error) {
                alert(error.message)
                return error
            }
        },
        async synchronizeAccount(){
            try {
                let response = await axios.get('/api/sync',{
                    headers: {
                        Authorization: "Bearer " + this.getToken()
                    }
                })
                return response.data
            } catch (error) {
                alert(error.message)
                console.error(error.message)
                return error
            }
        },
        cleanupStorage(){
            localStorage.clear('42_IS_LOGGED_IN')
            localStorage.clear('42_token')
            localStorage.clear('42_account_id')
        }

    }

})