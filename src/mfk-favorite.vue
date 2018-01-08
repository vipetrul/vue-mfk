<template>

    <v-select
              v-bind:items="_favoriteMfks"
              v-model="selectedMfk"
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
                        <v-flex>Add new mfk</v-flex>
                    </template>
                    <template v-else>
                        {{ data.item.alias }}
                    </template>
                </template>
            </v-select>
</template>

<script>

export default {
  props: {
    value: {
      //mfk input
      type: String,
      required: true
    },
    favoriteMfks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
    _favoriteMfks: function() {
      return [
        { type: "addMfk" }, //instucts to add mfk
        { divider: true }, //insructs to add a divider
        ...(this.favoriteMfks.length == 0 ? [{ header: "You have no favorite MFKs" }] : this.favoriteMfks) //existing
      ];
    },
    selectedMfk: {
      get: function() {
        let favMfk = this.favoriteMfks.find(item => item.mfk == this.value); //find favorite mfk based on string MFK
        return favMfk;
      },
      set: function(newValue) {
        this._mfk = newValue.mfk;
      }
    },
    isFavoriteMfk: function() {
      return this.favoriteMfks.find(item => item.value == this.value);
    }
  },
  methods: {
    onChange: function($event) {
      this.$emit("input", $event.mfk);
    },
    favoriteClick: function($event) {
      console.log("clicked", $event);
    },
    log:function(item){
        console.log(item);
    }
  }
};
</script>

<style scoped>
.favoriteMfks {
  width: 158px;
  white-space: nowrap;
}
.favBtn {
  margin: 0;
}
</style>
