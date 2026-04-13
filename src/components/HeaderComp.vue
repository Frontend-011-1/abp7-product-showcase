<script setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { defineEmits } from 'vue';

const emit = defineEmits(['changeTheme'])
const systemTheme = useTheme().global.name.value
const theme = ref(systemTheme)

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  emit('changeTheme', theme.value)
}
</script>

<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-app-bar-title text="Product Showcase" />
      <v-btn :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="onClick">
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<style scoped></style>