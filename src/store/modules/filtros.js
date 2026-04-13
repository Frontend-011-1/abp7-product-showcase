export default {
  namespaced: true,

  state: {
    categoria: null,
    precioMin: 0,
    precioMax: 0,
  },
  mutations: {
    SET_CATEGORIA(state, categoria) {
      state.categoria = categoria;
    },
    SET_PRECIO_MIN(state, min) {
      state.precioMin = min;
    },
    SET_PRECIO_MAX(state, max) {
      state.precioMax = max;
    },
    RESET_FILTROS(state) {
      state.categoria = null;
      state.precioMin = 0;
    },
  },
  getters: {
    productosFiltrados(state, _getters, rootState) {
      return rootState.productos.productos.filter((producto) => {
        const coincideCategoria =
          !state.categoria || producto.category === state.categoria;
        const coincidePrecio =
          producto.price >= state.precioMin &&
          producto.price <= state.precioMax;

        return coincideCategoria && coincidePrecio;
      });
    },
  },
};
