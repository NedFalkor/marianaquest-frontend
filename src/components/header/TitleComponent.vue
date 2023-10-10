<template>
  <div class="flex flex-col items-center pt-12">
      <h1 class="title text-4xl font-bold text-blue-500 tracking-wider pb-2 mb-8 bebas-neue">
        {{ pageTitle }}
      </h1>
      <!-- Ajoutez votre formulaire ici -->
  </div>
</template>

<script lang="ts">
export default {
props: {
  pageTitle: {
    type: String,
    required: true
  }
}
}
</script>

<style scoped>

.bebas-neue {
  font-family: 'Bebas Neue', sans-serif;
}

</style>