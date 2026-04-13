import { mount } from '@vue/test-utils';
import store from '@/store';
import ProductCard from '@/components/ProductCard.vue';

// En unit tests no importamos Vuetify completo (incompatible con Jest 27).
// Stubeamos (los 'inventamos' o cambiamos por algo mas sencillo como un div que Jest si pueda entender) sus componentes con versiones mínimas que renderizan sus slots,
// permitiendo testear la lógica del componente sin levantar toda la librería.

const vuetifyStubs = {
  'v-card': { template: '<div><slot /></div>' },
  'v-img': { template: '<img :src="src" />', props: ['src'] },
  // v-card-item usa el slot "title" para el título del producto
  'v-card-item': {
    template: '<div><slot name="title" /><slot /><slot name="append" /></div>',
  },
  'v-card-title': { template: '<div><slot /></div>' },
  'v-card-subtitle': { template: '<div><slot /></div>' },
  'v-card-actions': { template: '<div><slot /></div>' },
  'v-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  'v-icon': { template: '<span />' },
  'v-chip': { template: '<span><slot /></span>' },
}; // solamente queremos probar si la app manda bien el objeto visualmente sin tener que cargar animaciones pesadas de Vuetify para confirmarlo. Está fingiendo ser el componente v-card de Vuetify

describe('ProductCard.vue', () => {
  it('renders product data correctly', () => {
    const product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: 'image.jpg',
    };
    const wrapper = mount(ProductCard, {
      props: { product },
      global: {
        plugins: [store],
        stubs: vuetifyStubs,
      },
    });
    expect(wrapper.text()).toContain(product.title);
    expect(wrapper.text()).toContain(String(product.price));
    expect(wrapper.find('img').attributes('src')).toBe(product.image);
  });
});
