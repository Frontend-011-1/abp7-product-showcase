export default {
  namespaced: true,
  state: {
    favoritos: [],
  },
  mutations: {
    ADD_FAVORITO(state, producto) {
      state.favoritos.push(producto);
    },
    REMOVE_FAVORITO(state, productoId) {
      state.favoritos = state.favoritos.filter((prod) => prod.id != productoId);
    },
  },

  actions: {
    toggleFavoritos({ commit, state }, producto) {
      const yaEsFavorito = state.favoritos.some(
        (prod) => prod._id === producto._id,
      );
      if (yaEsFavorito) {
        commit('REMOVE_FAVORITO', producto._id);
      } else {
        commit('ADD_FAVORITO', producto);
      }
    },
  },

  getters: {
    totalFavoritos(state) {
      return state.favoritos.length;
    },
    esFavorito: (state) => (productoId) => {
      return state.favoritos.some((prod) => prod._id === productoId);
    },
  },
};
