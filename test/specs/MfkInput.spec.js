import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'

describe('MfkInput.vue', function () {
  it('should render correct contents', function () {
    plugin(Vue);
    let data = {mfk:"123"};
    const vm = createVM(this, `
    <v-app>
      <v-layout wrap>
        <v-flex xs12>
          <mfk-input v-model='mfk'></mfk-input>
        </v-flex>
        <v-flex xs12>
          <mfk-input v-model='mfk' :disabled="true"></mfk-input>
        </v-flex>
        <v-flex xs12>
          <mfk-input v-model='mfk' :disabled-fields="[5]"></mfk-input>
        </v-flex>
      </v-layout>
    </v-app>
    <br/><input v-model="mfk"/>`,{data:data});
//vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
