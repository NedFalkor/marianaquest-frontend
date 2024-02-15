<template>
    <div>
        <ul>
            <li v-for="log in diveLogs" :key="log.id">
                {{ log.user }} - {{ log.settings?.dive_date }}
                <button @click="emitEditLog(log)">Edit</button>
                <button @click="emitDeleteLog(log)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { IDivingLog } from '@/interfaces/DivingLog';

export default defineComponent({
    name: 'DiveLogListComponent',
    props: {
        diveLogs: {
            type: Array as PropType<IDivingLog[]>,
            required: true,
        },
    },
    methods: {
        emitEditLog(log: IDivingLog) {
            this.$emit('edit-log', log);
        },
        emitDeleteLog(log: IDivingLog) {
            this.$emit('delete-log', log);
        },
    },
});

</script>