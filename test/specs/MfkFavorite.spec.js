import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'

describe('MfkFavorite.vue', function () {
  it('should render correct contents', function () {
    plugin(Vue);
    let data = {
            mfk:"123-45",
            favoriteMfks:[
              {alias:"Whole thing" , mfk:"111-22-3333-44444444-5555-666-77777-88-9999"},
              {alias:"Empty MFK" , mfk:""},
              {alias:"Just Ones" , mfk:"111-11-1111-11111111-5555-666-77777-88-9999"},
              {alias:"No Org" , mfk:"444--6666-11111111-5555-666-77777-88-9999"},
            ]
          };
    const vm = createVM(this, `
    <v-app style="position:relative">
        <v-flex>
          <mfk-input v-model="mfk">
            <mfk-favorite 
                slot="beforeMfk" 
                v-model="mfk" 
                :favoriteMfks="favoriteMfks"
                ></mfk-favorite>
          </mfk-input>
          <div><input v-model="mfk" style="width:200px" /></div>
        </v-flex>
    </v-app>`, {data:data});
//vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
