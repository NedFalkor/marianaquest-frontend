<template>
    <div>
        <header-component></header-component>
        <TitleComponent :pageTitle="`Formulaire de plongée`" />
        <div class="form-container">
    <dive-settings-component class="form-item"></dive-settings-component>
    <dive-equipment-component class="form-item"></dive-equipment-component>
    <dive-conditions-component class="form-item"></dive-conditions-component>

        </div>
    </div>
</template>

<script lang="ts">
import DiveSettingsComponentVue from '@/components/forms/divelog/DiveSettingsComponent.vue'
import DiveEquipmentComponentVue from '@/components/forms/divelog/DiveEquipmentComponent.vue'
import DiveConditionsComponent from '@/components/forms/divelog/DiveConditionsComponent.vue'
import TitleComponent from '@/components/header/TitleComponent.vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'

export default {
    components: {
        'dive-settings-component': DiveSettingsComponentVue,
        'dive-equipment-component': DiveEquipmentComponentVue,
        'dive-conditions-component': DiveConditionsComponent,
        TitleComponent,
        HeaderComponent
    }
}
</script>

<style>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.form-item {
    width: 70%; /* Ou tout autre pourcentage/px/em/vw que vous souhaitez */
    margin: 0 auto; /* Cela va centrer le bloc à l'intérieur de .form-container */
}

</style>