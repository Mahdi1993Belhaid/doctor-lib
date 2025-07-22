import { defineStore } from 'pinia';

export const useImageStore = defineStore('image', {
    state:()=>({
        imageUrl:'/images/default-profile.jpg'
    })
})