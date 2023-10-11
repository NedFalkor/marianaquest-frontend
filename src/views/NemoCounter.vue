<template>
    <div class="container">
        <h2 class="title mt-3 mb-3">Calculateur de Temps de Plongée</h2>
        <form @submit.prevent="calculateDiveTimeWithEstimation" class="form">
            <div class="field mt-3 mb-3">
                <label class="label mt-3 mb-3" for="bottleCapacity">Capacité de la Bouteille (Litres)</label>
                <div class="control">
                    <input class="input mt-3 mb-3" type="number" id="bottleCapacity" required>
                </div>
            </div>

            <div class="field mt-3 mb-3">
                <label class="label mt-3 mb-3" for="bottlePressure">Pression de la Bouteille (bar)</label>
                <div class="control">
                    <input class="input mt-3 mb-3" type="number" id="bottlePressure" required>
                </div>
            </div>

            <div class="field mt-3 mb-3">
                <label class="label mt-3 mb-3" for="safetyReserve">Réserve de Sécurité (bar)</label>
                <div class="control">
                    <input class="input mt-3 mb-3" type="number" id="safetyReserve" required>
                </div>
            </div>

            <div class="field mt-3 mb-3">
                <label class="label mt-3 mb-3" for="maxDepth">Profondeur Maximale (mètres)</label>
                <div class="control">
                    <input class="input mt-3 mb-3" type="number" id="maxDepth" required>
                </div>
            </div>

            <button type="submit" class="button is-primary is-fullwidth mt-3 mb-3">Calculer</button>
        </form>

        <div v-if="diveTime !== null" class="result mt-5">
            <p class="subtitle is-4 mt-3 mb-3" v-if="calculateTotalCapacity() > 0">
                <u>Capacité totale :</u> <strong>{{ calculateTotalCapacity() }} litres</strong>
            </p>
            <p class="subtitle is-4 mt-3 mb-3">
                <u>Temps de plongée à {{ maxDepth }} mètres :</u> <strong>{{ diveTime }} minutes</strong>
            </p>
            <p class="subtitle is-5 mt-3 mb-3">
                <u>Temps de montée (à {{ ascentRate }} mètres/minute) :</u>
                <strong>{{ maxDepth / ascentRate }} minutes</strong>
            </p>
            <p class="subtitle is-5 mt-3 mb-3" v-if="totalDiveTime !== null">
                <u>Temps total de plongée :</u> <strong>{{ totalDiveTime }} minutes</strong>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NemoCounter',
    data() {
        return {
            capacityBottle: 0,
            bottlePressure: 0,
            safetyReserve: 0,
            maxDepth: 0,
            diveTime: null as number | null,
            airConsumption: 20,
            ascentRate: 15,
            totalDiveTime: null as number | null
        };
    },
    methods: {
        calculateTotalCapacity(): number {
            return this.capacityBottle * (this.bottlePressure - this.safetyReserve);
        },
        calculateDiveTimeWithEstimation(): void {
            const surfaceAirConsumption = 20;
            const pressureFactor = 20;

            const availableAir = this.calculateTotalCapacity();
            const timeToAscend = this.maxDepth / this.ascentRate;
            const airConsumedDuringDescent = (this.maxDepth / 2) * (surfaceAirConsumption + (this.maxDepth / 10) * pressureFactor);
            const airConsumedDuringAscent = timeToAscend * (surfaceAirConsumption + (this.maxDepth / 10) * pressureFactor);
            const totalAirConsumed = airConsumedDuringDescent + airConsumedDuringAscent;

            this.diveTime = (availableAir - totalAirConsumed) / surfaceAirConsumption;

            this.totalDiveTime = this.calculateTotalDiveTime();
        },
        calculateTotalDiveTime(): number {
            const timeToSurface = 1.13;
            const timeAtFirstDecoStop = 13;
            const timeBetweenDecoStops = 0.5;

            return timeToSurface + timeAtFirstDecoStop + timeBetweenDecoStops;
        }
    }
});
</script>


<style lang="">
    
</style>