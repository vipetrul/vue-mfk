import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'

describe('MfkInput.vue', function () {
  it('should render correct contents', function () {
    plugin(Vue);
    const vm = createVM(this, `<v-app><mfk-input></mfk-input></v-app>`);
//vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
