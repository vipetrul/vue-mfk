import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'
import _ from 'lodash'

describe('MfkFavorite.vue - with explicit prop functions', function () {
  it('should use explicit functions when provided', function () {
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
        addMfk: function(newMfk){return new Promise((resolve,reject)=> window.setTimeout(()=>{mfkStore.push(newMfk); resolve()},100))},
        getMfks: function(){return new Promise((resolve,reject)=> window.setTimeout(()=>resolve(mfkStore),100))},
        removeMfk:function(removedMfk){return new Promise((resolve,reject)=> window.setTimeout(()=> { _.reject(mfkStore,(mfk)=> mfk == removedMfk); resolve()},100))},
      }
    };
    const vm = createVM(this, `
    <v-app>
      <v-layout>  
        <v-flex d-flex>
          <mfk-favorite 
                v-model="mfk" 
                :getFavoriteMfks="getMfks"
                :addFavoriteMfk="addMfk"
                :removeFavoriteMfk="removeMfk"
                ></mfk-favorite>
            <mfk-input v-model="mfk"></mfk-input>
        </v-flex>
      </v-layout>
      <div><input v-model="mfk" style="width:400px" /></div>
    </v-app>`, options);
    //vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
