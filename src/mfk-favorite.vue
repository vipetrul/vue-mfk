<template>
    <v-flex d-inline-flex class="favorite-mfk-wrapper">
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

export default {
  props: {
    value: { // mfk input
      type: String,
      required: true
    },
    favorites: {
      type: Array,
      required: true
    }
  },
  computed: {
    optionsForFavoriteMfks: function(){
        if(this.favorites.length > 0)
          return _.sortBy(this.favorites, [(item)=> item.alias.toLowerCase() ]);
        else
          return [{ header: 'You have no favorite MFKs' }];
    },
    selectedFavoriteMfk:{
      get: function () {
        return _.find(this.favorites, item => item.mfk === this.value)
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
      let newAlias = prompt("Please specify alias name for new favorite MFK.")

      if (!newAlias) return;

      this.$emit('add', {mfk: this.value, alias: newAlias});
    },
    removeMfkFromFavorites: function(){
      if(confirm(`Remove favorite MFK '${this.selectedFavoriteMfk.alias}' ?`))
        {
          this.$emit('remove', this.selectedFavoriteMfk);
        }
    }
  }
}
</script>

<style scoped>
.favorite-mfk-wrapper {
  max-width: 170px;
  width: 170px;
  margin-right: 0.3em;
  }

.favoriteMfks { white-space: nowrap; }
.favoriteMfks >>> label {min-width: 120%;}
.favBtn { margin: 0; }

/* Button is causing spasing issues when not in flex parent container, need to manually adjust */
.favorite-mfk-btn{
  flex: 0 0 auto; 
  margin-right:2px;
  margin-left:2px;
  margin-top:13px;  
  top:8px !important}

</style>
