import { defineStore } from 'pinia'

import { ref } from 'vue'

export type Store = ReturnType<typeof useStore>

import { ShotRecordStore } from './types/ShotRecord'
import { SceneInfoStore } from './types/SceneInfo'

export const useStore = defineStore('app', () => {
    
    const shot_record = ref<ShotRecordStore[]>([])
    const scene_info = ref<SceneInfoStore[]>([])

    return { shot_record, scene_info }
}, {
    // @ts-ignore
    persist: {
        enabled: true,
        strategies: [{
            key: "app",
            storage: localStorage
        }]
    }   
})
