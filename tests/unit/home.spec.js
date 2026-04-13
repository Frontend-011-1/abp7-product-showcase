import { mount, flushPromises } from '@vue/test-utils';
import { createStore } from 'vuex';
import HomeView from '@/views/HomeView.vue';
import apiClient from '@/api/apiClient';
import productos from '@/store/modules/productos';
import filtros from '@/store/modules/filtros';
import favoritos from '@/store/modules/favoritos';

// jest.mock() reemplaza un módulo REAL (en este caso, nuestra configuración para consumir la API de productos) por una versión falsa durante los tests.
// Esto evita que el test haga peticiones HTTP reales a la API.
//
// Argumentos:
//   1. '@/api/apiClient'  → el módulo a reemplazar (la importación que usa el código)
//   2. () => ({ get: jest.fn() }) → factory que devuelve el módulo falso:
//        - El objeto reemplaza al cliente de Axios
//        - `get` es un "spy" de Jest: una función vacía que podemos programar
//          para que resuelva o rechace a voluntad en cada test
//
// Después de este mock, cuando el código llame a `apiClient.get(...)`,
// en realidad llamará a esta función falsa controlada por nosotros.
jest.mock('@/api/apiClient', () => ({ get: jest.fn() }));

// Siempre crear una instancia fresca del store para evitar
// que el estado de un test afecte a los demás
const createFreshStore = () =>
  createStore({ modules: { productos, filtros, favoritos } });

// Stubs para todos los componentes de Vuetify usados en HomeView y sus hijos
const vuetifyStubs = {
  'v-row': { template: '<div><slot /></div>' },
  'v-col': { template: '<div><slot /></div>' },
  'v-select': { template: '<div />' },
  'v-number-input': { template: '<div />' },
  'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  'v-card': { template: '<div><slot /></div>' },
  'v-img': { template: '<img :src="src" />', props: ['src'] },
  'v-card-item': {
    template: '<div><slot name="title" /><slot /><slot name="append" /></div>',
  },
  'v-card-title': { template: '<div><slot /></div>' },
  'v-card-subtitle': { template: '<div><slot /></div>' },
  'v-card-actions': { template: '<div><slot /></div>' },
  'v-icon': { template: '<span />' },
  'v-chip': { template: '<span><slot /></span>' },
  // Stubeamos ProducList para no necesitar sus dependencias transitivas
  ProducList: { template: '<div />' },
};

describe('HomeView.vue', () => {
  it('shows error when API fails', async () => {
    // .mockRejectedValue() programa el spy para que, en la PRÓXIMA llamada,
    // rechace la promesa con el error indicado.
    //
    // Es el equivalente de simular esto en el código real:
    //   apiClient.get = () => Promise.reject(new Error('Network Error'))
    //
    // Gracias a esto, cuando el componente llame a apiClient.get('/products'),
    // recibirá un error → el catch del action ejecutará SET_ERROR → el store
    // tendrá error !== null → el template mostrará el mensaje de error.
    //
    // Si quisiéramos simular ÉXITO usaríamos .mockResolvedValue({ data: { data: [] } })

    /* 
      Qué hace .mockRejectedValue() — programa el spy para que rechace la promesa en la próxima llamada
      El equivalente en código real — ayuda a visualizar qué está pasando "por debajo"
      El flujo causal completo — apiClient.get falla → catch → SET_ERROR → store.error !== null → template muestra error
      El método opuesto — .mockResolvedValue() para cuando quieran testear el caso de éxito, con la forma exacta que esperaría el código ({ data: { data: [] } })
    */
    apiClient.get.mockRejectedValue(new Error('Network Error'));

    const store = createFreshStore();
    const wrapper = mount(HomeView, {
      global: {
        plugins: [store],
        stubs: vuetifyStubs,
      },
    });

    // flushPromises espera a que se resuelvan TODAS las promesas pendientes,
    // incluída la del onMounted (fetchProducts)
    await flushPromises();

    expect(wrapper.find('[data-test="error-msg"]').exists()).toBe(true);
  });
});
