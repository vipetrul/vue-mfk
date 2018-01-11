<template>
    <v-flex d-inline-flex>
      <v-btn flat icon small top depressed color="indigo">
        <v-icon>star</v-icon>
      </v-btn>
      <v-select
              ref="favoriteMfkSelector"
              v-bind:items="favoriteMfks"
              :value="selectedMfk"
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
    this.init()
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
    selectedMfk: {
      get: function () {
        return _.find(this.favoriteMfks, item => item.mfk === this.value)
      }
    }
  },
  methods: {
    init: function () {
      Promise.resolve(this.getFavoriteMfks()).then(mfks => {
        this.favoriteMfks = [
          { type: 'addMfk' }, // instucts to add mfk
          { divider: true }, // insructs to add a divider
          ...(mfks.length == 0
            ? [{ header: 'You have no favorite MFKs' }]
            : mfks) // add actual mfks
        ]
      })
    },
    onChange: function ($event) {
      if ($event.type == 'addMfk') {
        const alias = prompt('Please specify alias name for new Favorite MFK:')
        if (!alias) {
          alert('MFK alias is rquired.')
          this.init()
          return
        }
        Promise.resolve(
          this.addFavoriteMfk({ alias: alias, mfk: this.value })
        ).then(() => this.init())
      } else this.$emit('input', $event.mfk)
    },
    favoriteClick: function ($event) {
      console.log('clicked', $event)
    }
  }
}
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
