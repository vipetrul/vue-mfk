import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'
import _ from 'lodash'

describe('MfkFavorite.vue - with default functions', function () {
  it('Should use dafault options when provided', function () {
    let mfkStore = [
      { alias: "Default 1", mfk: "111-22-3333-44444444-5555-666-77777-88-9999" },
      { alias: "Default 2", mfk: "222-11-1111-11111111-5555-666-77777-88-9999" },
      { alias: "Default 3", mfk: "333-01-6666-11111111-5555-666-77777-88-9999" },
    ];

    var defaults = {
      addFavoriteMfk: function(newMfk){return new Promise((resolve,reject)=> window.setTimeout(()=>{mfkStore.push(newMfk); resolve()},100))},
      getFavoriteMfks: function(){return new Promise((resolve,reject)=> window.setTimeout(()=>resolve(mfkStore),100))},
      removeFavoriteMfk: function(removedMfk){return new Promise((resolve,reject)=> window.setTimeout(()=> { _.reject(mfkStore,(mfk)=> mfk == removedMfk); resolve()},100))},
    }
    
    plugin(Vue, defaults);

    let options = {
      data: {
        mfk: "123-45",
      }
    };
    const vm = createVM(this, `
    <v-app>
      <v-layout>  
        <v-flex d-flex>
          <mfk-favorite v-model="mfk"></mfk-favorite>
          <mfk-input v-model="mfk"></mfk-input>
        </v-flex>
      </v-layout>
      <div><input v-model="mfk" style="width:400px" /></div>
    </v-app>`, options);
    //vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})