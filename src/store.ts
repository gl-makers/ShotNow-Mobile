import { defineStore } from 'pinia'

import { ref, computed, watch } from 'vue'

export type Store = ReturnType<typeof useStore>

import { ShotRecordStore } from './types/ShotRecord'


export const useStore = defineStore('app', () => {
    
    const shot_record = ref<ShotRecordStore[]>([])

    return { shot_record }
}, {
    // @ts-ignore
    persist: {
        enabled: true,
        strategies: [{
            key: "login",
            storage: localStorage
        }]
    }   
})
