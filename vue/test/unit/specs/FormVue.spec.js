import Vue from 'vue';
import FormVue from '@/components/FormVue';
import fetch from 'isomorphic-fetch';

describe('FormVue.vue', () => {
  it('has a created hook', () => {
    expect(typeof FormVue.created).toBe('function');
  });

  it('sets the correct default data', () => {
    expect(typeof FormVue.data).toBe('function');
    const defaultData = FormVue.data();
    expect(defaultData.data).toEqual({});
  });

  it('check if form is redering form', (done) => {
    const Widget = Vue.extend(FormVue)
    const vm = new Widget();

    setTimeout(function(){
      vm.$mount();
      expect(vm.$el).toMatchSnapshot();
      done();
    }, 1000);
  });
});
