<template>
  <div>
    <h1>ksksk</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/models/User';
import {userService} from '/src/services/UserService'

export default defineComponent({
  name: 'Test',
  data() {
    return {
      users: [] as User[] ,
      user: {} as User,
    };
  },
  mounted() {
    this.getUserByEmail();

  },
  methods: {
    async getUsers(){
      this.users = await  userService.getUsers();
    },

    async getUserByEmail(){
      this.user = await userService.getUserByEmail('laila.fawzi@example.com');
      console.log(this.user)
    }
  },
});
</script>
