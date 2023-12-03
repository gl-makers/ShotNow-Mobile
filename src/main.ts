import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

import router from './router'

import { createPinia, PiniaPlugin } from 'pinia'
// @ts-ignore
import piniaPersist from 'pinia-plugin-persist';

declare module 'pinia' {
    export interface PiniaCustomProperties {
        $persist: PiniaPlugin
    }
}

const pinia = createPinia()
console.log(piniaPersist);

pinia.use(piniaPersist)

createApp(App)
.use(pinia)
.use(Varlet)
.use(router)
.mount('#app')
