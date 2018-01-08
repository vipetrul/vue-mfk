import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'

describe('MfkFavorite.vue', function () {
  it('should render correct contents', function () {
    plugin(Vue);
    let data = {mfk:"123-45"};
    const vm = createVM(this, `
    <v-app style="position:relative">
        <v-flex>
          <mfk-input v-model="mfk">
            <mfk-favorite slot="beforeMfk" v-model="mfk"></mfk-favorite>
          </mfk-input>
          <div><input v-model="mfk" style="width:200px" /></div>
        </v-flex>
    </v-app>`, {data:data});
//vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
