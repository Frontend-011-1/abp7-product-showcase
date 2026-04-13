import { createStore } from 'vuex';
import productos from './modules/productos';
import filtros from './modules/filtros';
import favoritos from './modules/favoritos';

export default createStore({
  modules: {
    productos,
    filtros,
    favoritos,
  },
});
