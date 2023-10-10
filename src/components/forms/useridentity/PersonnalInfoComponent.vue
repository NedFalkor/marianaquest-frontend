<template>
    <div class="flex flex-col items-center">
      
      <!-- Image Upload -->
      <div class="flex flex-col items-center mb-7 p-5 border border-gray-300 rounded w-4/5 min-w-[300px]">
        <input type="file" accept="image/*" @change="onFileSelected" class="mb-5"/>
      </div>

      <!-- Personal Details -->
      <div class="flex flex-col items-center mb-7 p-5 border border-gray-300 rounded w-4/5 min-w-[300px]">
        <h3 class="text-xl mb-4 text-center">Nom de Famille</h3>
        <input type="text" id="nom" class="w-full p-2 mb-4 border border-gray-300 rounded" />

        <h3 class="text-xl mb-4 text-center">Prénom</h3>
        <input type="text" id="prenom" class="w-full p-2 mb-4 border border-gray-300 rounded" />

        <h3 class="text-xl mb-4 text-center">Adresse</h3>
        <input type="text" id="adresse" class="w-full p-2 mb-4 border border-gray-300 rounded" />

        <h3 class="text-xl mb-4 text-center">Code Postal</h3>
        <input type="text" id="codePostal" class="w-full p-2 mb-4 border border-gray-300 rounded" />

        <h3 class="text-xl mb-4 text-center">Ville</h3>
        <input type="text" id="ville" class="w-full p-2 mb-4 border border-gray-300 rounded" />

        <h3 class="text-xl mb-4 text-center">Pays</h3>
        <input type="text" id="pays" class="w-full p-2 mb-4 border border-gray-300 rounded" />
      </div>

      <div class="flex flex-col items-center mb-7 p-5 border border-gray-300 rounded w-4/5 min-w-[300px]">
        <h3 class="text-xl mb-4 text-center">Téléphone Fixe</h3>
        <input type="tel" id="telFixe" class="w-full p-2 mb-4 border border-gray-300 rounded" />

        <h3 class="text-xl mb-4 text-center">Téléphone Portable</h3>
        <input type="tel" id="mobile" class="w-full p-2 mb-4 border border-gray-300 rounded" />

        <h3 class="text-xl mb-4 text-center">Adresse Email</h3>
        <input type="email" id="courriel" class="w-full p-2 border border-gray-300 rounded" />
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'PersonnalInfo',
  data() {
    return {
      selectedImage: null as File | null
    };
  },
  methods: {
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedImage = input.files[0];
      }
    }
  }
};
</script>

<style>
    
</style>