<script setup>
import ProductList from '@/components/ProductList.vue';
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';

const store = useStore()


const loading = computed(() => store.state.productos.loading)
const error = computed(() => store.state.productos.error)

const precioMin = computed(() => store.state.filtros.precioMin)
const precioMax = computed(() => store.state.filtros.precioMax)

const productosFiltrados = computed(() => store.getters['filtros/productosFiltrados'])

const categorias = computed(() => [... new Set(store.state.productos.productos.map(producto => producto.category))])
console.log(categorias)

// Items para el select
const categoriasItems = computed(() => [
  { title: 'Todas', value: null },
  ...categorias.value.map(categoria => ({ title: categoria, value: categoria }))
])

// Para actualizar el filtro
const onCategoria = (val) => store.commit('filtros/SET_CATEGORIA', val || null)
const onPrecioMin = (val) => store.commit('filtros/SET_PRECIO_MIN', Number(val))
const onPrecioMax = (val) => store.commit('filtros/SET_PRECIO_MAX', Number(val))

const resetFiltros = () => {
  store.commit('filtros/RESET_FILTROS')
  store.commit('filtros/SET_PRECIO_MAX', Math.max(...store.state.productos.productos.map(producto => producto.price)))
}

const totalFavoritos = computed(() => store.getters['favoritos/totalFavoritos'])

onMounted(async () => {
  await store.dispatch('productos/fetchProducts')
  store.commit('filtros/SET_PRECIO_MAX', Math.max(...store.state.productos.productos.map(producto => producto.price)))
})
</script>

<template>
  <div>
    <v-row class="align-center">
      <v-col cols="12" md="3">
        <v-select label="Categoría" :items="categoriasItems" @update:model-value="onCategoria"
          data-cy="category-filter"></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-number-input :min="0" label="Precio Mínimo" :model-value="precioMin"
          @update:model-value="onPrecioMin"></v-number-input>
      </v-col>
      <v-col cols="12" md="3">
        <v-number-input :min="0" label="Precio Máximo" :model-value="precioMax"
          @update:model-value="onPrecioMax"></v-number-input>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn text="Limpiar Filtros" block @click="resetFiltros" />
      </v-col>
    </v-row>
    <p>Favoritos: {{ totalFavoritos }}</p>
    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error" data-test="error-msg">{{ error }}</div>
    <ProductList v-else :products="productosFiltrados" />
  </div>
</template>
