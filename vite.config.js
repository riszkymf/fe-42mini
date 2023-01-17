import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig(()=>{
  const APP_ENV = process.env.APP_ENV || 'development'
  if(APP_ENV.toLowerCase() == 'development'){
    dotenv.config()
  }

  return{
    plugins: [vue()],
    server:{
      proxy:{
        '/api':{
          target: process.env.BACKEND_API_URL,
          changeOrigin: true,
          rewrite: (path)=>path.replace(/^\/api/, ''),
          ws: true,
          secure: false
        }
      }
    },
  preview:{
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    proxy:{
      '/api':{
        target: process.env.BACKEND_API_URL,
        changeOrigin: true,
        rewrite: (path)=>path.replace(/^\/api/, ''),
        ws: true,
        secure: false
      }
    }
  }
  }
})
