<script setup>
import HeaderComp from './components/HeaderComp.vue';
import { useTheme } from 'vuetify';
import { ref } from 'vue';

const systemTheme = ref(useTheme().global.name.value)

const handleChangeTheme = (value) => {
  systemTheme.value = value
}
</script>

<template>
  <v-app :theme="systemTheme">
    <header-comp @change-theme="handleChangeTheme" />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style></style>
