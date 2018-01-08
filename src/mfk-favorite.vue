<template>
    <v-select
              v-bind:items="favoriteMfks"
              v-model="selectedMfk"
              label="Favorite MFKs"
              item-text="key"
              item-value="value"
              :prepend-icon="isFavoriteMfk ? 'star' : 'star_border'"
              placeholder="Select"
              class="favoriteMfks"
              dense
              @change="onChange"
            ></v-select>
</template>

<script>
export default {
props:{
    value:String //mfk input
  },
  data() {
    return {
      _mfk: null,
      favoriteMfks: [
          {key:"Hello there" , value:"123-33"},
          {key:"Empty MFK" , value:""},
          {key:"Just Org" , value:"22"},
      ]
    };
  },
  computed:{
      selectedMfk: {
            get: function(){
                let favMfk = this.favoriteMfks.find( item => item.value == this.value)
                return favMfk ? favMfk.value : null;
                },
            set: function(newValue){
                this._mfk = newValue;
            }
        },
      isFavoriteMfk:function(){
          return this.favoriteMfks.find( item => item.value == this.value)
      },
  },
  methods:{
      onChange:function($event){
          this.$emit('input', $event );
      }
  }
};
</script>

<style scoped>
.favoriteMfks{width: 158px; white-space: nowrap}
</style>
