import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';
import {useAccountStore} from "../stores/account"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/auth",
            name: 'auth',
            redirect: to=>{ 
                const account = useAccountStore()
                axios.get('/api/auth/callback',{
                    params: to.query
                }).then((res)=>{
                    let data = res.data.data
                    localStorage.setItem('42_token',data.access_token)
                    localStorage.setItem('42_IS_LOGGED_IN',true)
                    localStorage.setItem('42_account_id',data.account_id)
                    account.loggedIn = true;
                }).catch(err=>{
                    console.error(err)
                })
                return {
                    path: "/",
                    query: {}
                }
            }
        }
    ]


})

export default router;