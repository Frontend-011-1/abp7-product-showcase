<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

defineProps({
  product: {
    type: Object,
    required: true
  }
})
const esFavorito = ref(false)

const toggleFavorito = () => {
  // ! operador de negacion -> le asigna el valor opuesto
  esFavorito.value = !esFavorito.value
}
</script>

<template>
  <v-card class="h-100 text-center" variant="text">
    <v-img :src="product.image" height="200px"></v-img>
    <v-card-title>
      {{ product.title }}
    </v-card-title>
    <v-card-subtitle class="text-green text-display-medium">
      ${{ product.price }}
      <v-chip v-if="product.isNew" color="green" size="x-small" density="comfortable">Nuevo producto</v-chip>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn @click="toggleFavorito" size="large" variant="plain" block>
        <v-icon :color="esFavorito ? 'red' : 'gray'" :icon="esFavorito ? 'mdi-heart' : 'mdi-heart-outline'">
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>