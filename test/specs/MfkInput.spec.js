import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'

describe('MfkInput.vue', function () {
  it('should render correct contents', function () {
    plugin(Vue);
    let data = {mfk:"123", error:"IAcct for travel expense should be 6010"};
    const vm = createVM(this, `
    <v-app>
      <v-layout wrap>
        <v-flex xs12>
          <mfk-input v-model='mfk' :error-message.sync="error"></mfk-input>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Custom Error" id="testing" v-model="error" ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <mfk-input v-model='mfk' :disabled="true"></mfk-input>
        </v-flex>
        <v-flex xs12>
          <mfk-input v-model='mfk' :disabled-fields="[5]"></mfk-input>
        </v-flex>
        
      </v-layout>
    </v-app>
    <br/><input v-model="mfk" style="width:100%; border:1px solid gray"/>`,{data:data});
//vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
