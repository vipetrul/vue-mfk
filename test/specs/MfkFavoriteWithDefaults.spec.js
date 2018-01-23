import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'
import _ from 'lodash'

describe('MfkFavorite.vue - with default functions', function () {
  it('Should use dafault options when provided', function () {
    let mfkStore = [
      { alias: "Default 1", mfk: "111-22-3333-12345-44444444-5555-666-77777-88-9999" },
      { alias: "Default 2", mfk: "222-11-1111-12345-11111111-5555-666-77777-88-9999" },
      { alias: "Default 3", mfk: "333-01-6666-12345-11111111-5555-666-77777-88-9999" },
      { alias: "Valid MFK", mfk: "260-43-5064-40100-00000000-6026-520-20100-00-0000" },
    ];

    var defaults = {
      addFavoriteMfk: function(newMfk){return new Promise((resolve,reject)=> window.setTimeout(()=>{console.log('new', newMfk);mfkStore.push(newMfk); resolve()},100))},
      getFavoriteMfks: function(){return new Promise((resolve,reject)=> window.setTimeout(()=>{console.log('get', mfkStore); resolve(mfkStore)},100))},
      removeFavoriteMfk: function(removedMfk){ console.log('a2', removedMfk);return new Promise((resolve,reject)=> window.setTimeout(()=> { mfkStore = _.reject(mfkStore,(mfk) => mfk.alias == removedMfk.alias && mfk.mfk == removedMfk.mfk); resolve()},100))},
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
