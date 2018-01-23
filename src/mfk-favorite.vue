<template>
    <v-flex d-flex class="favorite-mfk-wrapper">
      <v-btn flat icon small top depressed 
          color="indigo" 
          :title="buttonTitle"
          @click="toggleFavoriteMfk"
          class="favorite-mfk-btn"
          >
        <v-icon>{{isFavoriteMfk?'star':'star_border'}}</v-icon>
      </v-btn>
      <v-select
              ref="favoriteMfkSelector"
              v-bind:items="optionsForFavoriteMfks"
              :value="selectedFavoriteMfk"
              label="Favorite MFKs"
              placeholder="Select"
              class="favoriteMfks"
              dense
              @change="onChange"
            >
                <template slot="selection" slot-scope="data">
                    {{data.item.alias}}
                </template>
                <template slot="item" slot-scope="data">
                    {{ data.item.alias }} 
                </template>
            </v-select>
      </v-flex>
</template>

<script>
import _ from 'lodash'
import defaults from './defaults'

export default {
  created: function () {
    this.loadFavoriteMfks();
  },
  props: {
    value: {
      // mfk input
      type: String,
      required: true
    },
    getFavoriteMfks: {
      type: Function,
      required: false,
      default: () => defaults.getFavoriteMfks()
    },
    addFavoriteMfk: {
      type: Function,
      required: false,
      default: (mfk) => defaults.addFavoriteMfk(mfk)
    },
    removeFavoriteMfk: {
      type: Function,
      required: false,
      default: (mfk) => defaults.removeFavoriteMfk(mfk)
    }
  },
  data: function () {
    return {
      favoriteMfks: []
    }
  },
  computed: {
    optionsForFavoriteMfks: function(){
        if(this.favoriteMfks)
          return _.sortBy(this.favoriteMfks, [(item)=> item.alias.toLowerCase() ]);
        else
          return [{ header: 'You have no favorite MFKs' }];
    },
    selectedFavoriteMfk:{
      get: function () {
        return _.find(this.favoriteMfks, item => item.mfk === this.value)
      }
    },
    isFavoriteMfk: function(){
      return this.selectedFavoriteMfk;
    },
    buttonTitle:function(){
      return this.isFavoriteMfk ? 'Remove MFK from Favorites' : 'Add MFK to Favorites';
    }
  },
  methods: {
    loadFavoriteMfks: function(){
      Promise.resolve(this.getFavoriteMfks())
        .then(data => this.favoriteMfks = _.cloneDeep(data)) //cloning, because we don't want to modify parent collection
        .catch(error => {
                          alert("There was a problem with loading favorite MFKs."); 
                          console.log("Favorite MFK loading problem:", error);
                        });
    },
    onChange: function ($event) {
      if ($event.mfk ) {
        this.$emit('input', $event.mfk); //tell parent that new MFK was selected
      } 
    },
    toggleFavoriteMfk: function(){
      if(this.isFavoriteMfk)
        this.removeMfkFromFavorites();
      else
        this.addMfkToFavorites();
    },
    addMfkToFavorites: function () {
      if(this.isFavoriteMfk){
        alert("This MFK is already one of your favorites.")
        return;
      }

      let newAlias = prompt("Please specify alias name for new favorite MFK.")

      if (!newAlias)
        return;

      let newFave = {mfk: this.value, alias: newAlias};
      this.favoriteMfks.push(newFave); //temporarily add new fave mfk, for fast UI update
      Promise.resolve(this.addFavoriteMfk(newFave))
        .catch((error)=> alert(`There was a problem while saving new favoreite MFK.\n${error}`))
        .finally(()=> this.loadFavoriteMfks());
    },
    removeMfkFromFavorites: function(){
      if(confirm(`Remove favorite MFK '${this.selectedFavoriteMfk.alias}' ?`))
        {
          let mfkToRemove = this.selectedFavoriteMfk;
          this.favoriteMfks = _.reject(this.favoriteMfks, item => item == mfkToRemove); //temporarily remove mfk, for fast UI update
          Promise.resolve(this.removeFavoriteMfk(mfkToRemove))
            .catch((error)=> alert(`There was a problem while removing favoreite MFK.\n${error}`))
            .finally(()=> this.loadFavoriteMfks());
        }
    }
  }
}
</script>

<style scoped>
.favorite-mfk-wrapper {
  max-width: 180px;
  width: 180px;
  margin-right: 0.3em;
  }
.favoriteMfks {
  white-space: nowrap;
}
.favBtn {
  margin: 0;
}

.favorite-mfk-btn{flex: 0 0 auto}
</style>
