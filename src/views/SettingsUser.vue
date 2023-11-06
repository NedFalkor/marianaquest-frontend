<template>
    <div class="bg-gray-100 w-full p-6 flex flex-wrap justify-center">
        <!-- Identité du plongeur -->
        <div class="w-1/2 p-6 border-r">
            <h3 class="text-2xl mb-5 text-center">Identité du plongeur</h3>

            <div v-if="imageURL" class="image-container mb-4 text-center">
                <img :src="imageURL" alt="Chosen Image" class="w-48 h-48 object-cover rounded-full mx-auto" />
            </div>

            <div class="mb-4">
                <h4 class="text-xl mb-2">Nom de Famille:</h4>
                <p class="mb-4">{{ lastName }}</p>

                <h4 class="text-xl mb-2">Prénom:</h4>
                <p class="mb-4">{{ firstName }}</p>

                <h4 class="text-xl mb-2">Adresse:</h4>
                <p class="mb-4">{{ address }}</p>

                <h4 class="text-xl mb-2">Code Postal:</h4>
                <p class="mb-4">{{ postalCode }}</p>

                <h4 class="text-xl mb-2">Ville:</h4>
                <p class="mb-4">{{ city }}</p>

                <h4 class="text-xl mb-2">Pays:</h4>
                <p class="mb-4">{{ country }}</p>

                <h4 class="text-xl mb-2">Téléphone Fixe:</h4>
                <p class="mb-4">{{ landline }}</p>

                <h4 class="text-xl mb-2">Téléphone Portable:</h4>
                <p class="mb-4">{{ mobile }}</p>

                <h4 class="text-xl mb-2">Adresse Email:</h4>
                <p class="mb-4">{{ email }}</p>
            </div>
        </div>

        <!-- En Cas de Nécessité -->
        <div class="w-1/2 p-6">
            <h3 class="text-2xl mb-5 text-center">En Cas de Nécessité</h3>
            <h4 class="text-sm mb-4 text-center italic">Personne à Prévenir</h4>

            <div class="mb-4">
                <h4 class="text-xl mb-2">Nom de Famille:</h4>
                <p class="mb-4">{{ emergencyLastName }}</p>

                <h4 class="text-xl mb-2">Prénom:</h4>
                <p class="mb-4">{{ emergencyFirstName }}</p>

                <h4 class="text-xl mb-2">Adresse:</h4>
                <p class="mb-4">{{ emergencyAddress }}</p>

                <h4 class="text-xl mb-2">Téléphone Fixe:</h4>
                <p class="mb-4">{{ emergencyLandline }}</p>

                <h4 class="text-xl mb-2">Téléphone Portable:</h4>
                <p class="mb-4">{{ emergencyMobile }}</p>

                <h4 class="text-xl mb-2">Adresse Email:</h4>
                <p class="mb-4">{{ emergencyEmail }}</p>
            </div>
        </div>
    </div>
</template>
  

<script lang="ts">
export default {
    data() {
        return {
            imageURL: '',
            lastName: '',
            firstName: '',
            address: '',
            postalCode: '',
            city: '',
            country: '',
            landline: '',
            mobile: '',
            email: '',
            emergencyLastName: '',
            emergencyFirstName: '',
            emergencyAddress: '',
            emergencyLandline: '',
            emergencyMobile: '',
            emergencyEmail: '',
        }
    },
}
</script>


<style lang="">
    
</style>