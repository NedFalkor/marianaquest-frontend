<template>
    <div>
        <dive-settings-component></dive-settings-component>
        <dive-equipment-component></dive-equipment-component>
        <dive-conditions-component></dive-conditions-component>
    </div>
</template>

<script lang="ts">
import DiveSettingsComponentVue from '@/components/forms/divelog/DiveSettingsComponent.vue'
import DiveEquipmentComponentVue from '@/components/forms/divelog/DiveEquipmentComponent.vue'
import DiveConditionsComponent from '@/components/forms/divelog/DiveConditionsComponent.vue'

export default {
    components: {
        'dive-settings-component': DiveSettingsComponentVue,
        'dive-equipment-component': DiveEquipmentComponentVue,
        'dive-conditions-component': DiveConditionsComponent
    }
}
</script>

<style>
    
</style>
