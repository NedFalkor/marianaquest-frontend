<template>
    <div>
        <h1>Liste des Utilisateurs</h1>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.username }} ({{ user.role }})
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts">
import CustomUserService from '@/services/gatekeepers/CustomUserService';
import { defineComponent, onMounted, ref } from 'vue';
import { ICustomUser } from '@/interfaces/CustomUser';

export default defineComponent({
    name: 'UserList',
    setup() {
        const users = ref<ICustomUser[]>([]);

        onMounted(async () => {
            try {
                const response = await CustomUserService.getAllUsers();
                console.log("Users fetched", response.data);
                users.value = response.data;
            } catch (error) {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            }
        });

        return {
            users
        };
    }
});
</script>