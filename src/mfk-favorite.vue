<template>
    <v-flex d-flex class="favorite-mfk-wrapper">
      <v-btn flat icon small top depressed 
          color="indigo" 
          title="Add MFK to Favorites"
          @click="addMfkToFavorites"
          class="favorite-mfk-btn"
          >
        <v-icon>{{isFavoriteMfk?'star':'star_border'}}</v-icon>
      </v-btn>
      <v-select
              ref="favoriteMfkSelector"
              v-bind:items="optionsForFavoriteMfks"
              :value="selectedFavoriteMfk"
              label="Favorite MFKs"
              item-text="key"
              item-value="value"
              placeholder="Select"
              class="favoriteMfks"
              dense
              @change="onChange"
            >
                <template slot="selection" slot-scope="data">
                    {{data.item.alias}}
                </template>
                <template slot="item" slot-scope="data">
                    <template v-if="data.item.type === 'addMfk'">
                        Add this MFK to favorites
                    </template>
                    <template v-else>
                        {{ data.item.alias }}
                    </template>
                </template>
            </v-select>
      </v-flex>
</template>

<script>
import _ from 'lodash'

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
      required: false
    },
    addFavoriteMfk: {
      type: Function,
      required: false
    },
    removeFavoriteMfk: {
      type: Function,
      required: false
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
          return this.favoriteMfks;
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
    }
  },
  methods: {
    loadFavoriteMfks: function(){
      Promise.resolve(this.getFavoriteMfks())
        .then(data => this.favoriteMfks = data)
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
    addMfkToFavorites: function () {
      if(this.isFavoriteMfk){
        alert("This MFK is already one of your favorites.")
        return;
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
