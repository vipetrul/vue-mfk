import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'
import _ from 'lodash'

describe('MfkFavorite.vue - with explicit prop functions', function () {
  it('should work', function () {
    plugin(Vue);
    let mfkStore = [
      { alias: "Whole thing", mfk: "111-22-3333-12345-44444444-5555-666-77777-88-9999" },
      { alias: "Just Ones", mfk: "111-11-1111-12345-11111111-5555-666-77777-88-9999" },
      { alias: "No Org", mfk: "444--6666-12345-11111111-5555-666-77777-88-9999" },
      { alias: "Valid MFK", mfk: "260-43-5064-40100-00000000-6026-520-20100-00-0000" },
    ];

    let options = {
      data: {
        mfk: "123-45",
        favorites: mfkStore
      },
      methods:{
        add:function(mfk){ mfkStore.push(mfk) },
        remove:function(mfk){ 
          let index = mfkStore.indexOf(mfk) ;
          if(index > -1) mfkStore.splice(index,1);
        }
      }
    };
    const vm = createVM(this, `
    <v-app>
      <v-layout wrap>  
        <v-flex>
          <v-card>
            <v-card-text style="display:flex">
              <mfk-input 
                  v-model="mfk"
                  :favorites="favorites"
                  @add="add"
                  @remove="remove">
              </mfk-input>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>
            <v-card-text>
              <mfk-input 
                  v-model="mfk"
                  :favorites="favorites"
                  @add="add"
                  @remove="remove">
              </mfk-input>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <div><input v-model="mfk" style="width:400px" /></div>
    </v-app>`, options);
    //vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
