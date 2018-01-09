import Vue from 'vue/dist/vue.js'
import plugin from '../../src/index'
import { createVM } from '../helpers/utils.js'
import _ from 'lodash'

describe('MfkFavorite.vue', function () {
  it('should render correct contents', function () {
    plugin(Vue);
    let mfkStore = [
      { alias: "Whole thing", mfk: "111-22-3333-44444444-5555-666-77777-88-9999" },
      { alias: "Just Ones", mfk: "111-11-1111-11111111-5555-666-77777-88-9999" },
      { alias: "No Org", mfk: "444--6666-11111111-5555-666-77777-88-9999" },
    ];

    let options = {
      data: {
        mfk: "123-45",
        addMfk: function(newMfk){return new Promise((resolve,reject)=> window.setTimeout(()=>{mfkStore.push(newMfk); resolve()},100))},
        getMfks: function(newMfk){return new Promise((resolve,reject)=> window.setTimeout(()=>resolve(mfkStore),100))},
        removeMfk:function(removedMfk){return new Promise((resolve,reject)=> window.setTimeout(()=> { _.reject(mfkStore,(mfk)=> mfk == removedMfk); resolve()},100))},
      },
      methods:{
        addFavoriteMfk:function(newMfk){
          this.favoriteMfks.push({alias: "new mfk", mfk: newMfk});
          console.log("new collection", this.favoriteMfks);
        }
      }

    };
    const vm = createVM(this, `
    <v-app style="position:relative">
        <v-flex>
          <mfk-input v-model="mfk">
            <mfk-favorite 
                slot="beforeMfk" 
                v-model="mfk" 
                :getFavoriteMfks="getMfks"
                :addFavoriteMfk="addMfk"
                :removeFavoriteMfk="removeMfk"
                @addFavoriteMfk="addFavoriteMfk"
                ></mfk-favorite>
          </mfk-input>
          <div><input v-model="mfk" style="width:400px" /></div>
        </v-flex>
    </v-app>`, options);
    //vm.$el.querySelector('.hello h1').textContent.should.eql('Hello World!')
  })
})
