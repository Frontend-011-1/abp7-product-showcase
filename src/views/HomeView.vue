<script setup>
import ProductList from '@/components/ProductList.vue';
import apiClient from '@/api/apiClient';
import { ref, onMounted } from 'vue';

const products = ref([])
const loading = ref(false)
const error = ref(null)

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await apiClient.get('/products')
    console.log(response)
    products.value = response.data.data
  } catch (err) {
    error.value('Error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div>
    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error">{{ error }}</div>
    <ProductList v-else :products="products" />
  </div>
</template>
