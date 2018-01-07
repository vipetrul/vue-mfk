import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'

describe('MfkInput.vue', function () {
  it('should render correct contents', function () {
    plugin(Vue);
    let data = {mfk:"123"};
    const vm = createVM(this, `<v-app><mfk-input v-model='mfk'></mfk-input></v-app><br/><input v-model="mfk"/>`,{data:data});
//vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
