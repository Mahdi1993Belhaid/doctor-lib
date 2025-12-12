<template>

    <form v-if="userForm" @submit="addnewUser">
        <label>الاسم</label>
        <input type="text" v-model="userForm.firstName" />
        <label>اللقب</label>
        <input type="text" v-model="userForm.lastName" />
        <label>التخصص</label>
        <input type="text" v-model="userForm.specialty" />
        <label>البريد الالكتروني</label>
        <input type="email" v-model="userForm.email" />
        <label>المؤسسة</label>
        <input type="text" v-model="userForm.hospital" />
        <label>كلمة السر</label>
        <input type="password" v-model="userForm.password" />
    </form>

</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {User,createDefaultUser} from '../models/User';
export default defineComponent ({

    name:'UserForm',


    date(){

        return {
         userForm: {} as User
    
        }
    },

    mounted() {
        this.userForm = createDefaultUser();
    },

    methods: {
        addnewUser(){

        }
    },

})



</script>