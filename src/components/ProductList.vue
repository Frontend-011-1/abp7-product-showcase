<script setup>
import ProductCard from './ProductCard.vue';
import { defineProps } from 'vue';

defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div>
    <h1>Home</h1>
    <v-row>
      <v-col cols="12" md="6" lg="4" xl="3" v-for="product in products" :key="product._id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>

  </div>
</template>

<style scoped></style>