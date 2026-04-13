import apiClient from '@/api/apiClient';

export default {
  namespaced: true,
  state: {
    productos: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_PRODUCTOS(state, productos) {
      state.productos = productos;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await apiClient.get('/products');
        commit('SET_PRODUCTOS', response.data.data);
      } catch (err) {
        commit('SET_ERROR', err);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
};
