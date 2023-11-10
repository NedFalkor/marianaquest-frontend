<template>
    <div>
        <ul>
            <li v-for="log in diveLogs" :key="log.id">
                {{ log.settings.dive_site }} - {{ log.settings.dive_date }}
                <slot :log="log"></slot>
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts">
import { IDivingLog } from '@/interfaces/DivingLog';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'DiveLogListComponent',
    props: {
        diveLogs: {
            type: Array as PropType<IDivingLog[]>,
            required: true,
        },
    },
});
</script>
