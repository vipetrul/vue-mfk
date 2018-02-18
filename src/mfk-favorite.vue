<template>
    <div class="favorite-mfk-wrapper">
      <v-btn flat icon small depressed
          color="indigo" 
          :title="buttonTitle"
          :disabled="disabled"
          @click="toggleFavoriteMfk">
        <v-icon>{{isFavoriteMfk?'star':'star_border'}}</v-icon>
      </v-btn>
      <div class="select-wrapper" style="display:inline-flex; width:140px">
        <v-select
          ref="favoriteMfkSelector"
          v-bind:items="optionsForFavoriteMfks"
          dense
          label="Favorite MFKs"
          placeholder="Select"
          class="favoriteMfks"
          :value="selectedFavoriteMfk"
          :disabled="disabled"
          @change="onChange">
            <template slot="selection" slot-scope="data">
                {{data.item.alias}}
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.alias }} 
            </template>
        </v-select>
      </div>
    </div>
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
    },
    disabled:{
      type:Boolean,
      default:false
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
        return _.find(this.favorites, item => item.mfk === this.value) || this.value
      }
    },
    isFavoriteMfk: function(){
      return this.selectedFavoriteMfk && this.selectedFavoriteMfk.mfk || false;
    },
    buttonTitle:function(){
      return this.isFavoriteMfk ? 'Remove MFK from Favorites' : 'Add MFK to Favorites';
    }
  },
  methods: {
    onChange: function ($event) {
      if ($event.mfk ) {
        this.$emit('favorite-mfk-selected', $event.mfk); //tell parent that new MFK was selected
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

      this.$emit('favorite-mfk-added', {mfk: this.value, alias: newAlias});
    },
    removeMfkFromFavorites: function(){
      if(confirm(`Remove favorite MFK '${this.selectedFavoriteMfk.alias}' ?`))
        {
          this.$emit('favorite-mfk-removed', this.selectedFavoriteMfk);
        }
    }
  }
}
</script>

<style scoped>
.favorite-mfk-wrapper {
  display: inline-block;
  margin-right: 0.3em;
  }
.select-wrapper{
  display:inline-flex; /* This is needed for IE 11 */
  width:140px;
}

/* vertical-allign displayed differently bw chrome and firefox, had to use top + margin-top */
.favorite-mfk-wrapper >>> .btn {margin: 0; margin-top:1.4em; vertical-align:top } 
.favoriteMfks { white-space: nowrap; }
.favoriteMfks >>> label {min-width: 120%;}
</style>
