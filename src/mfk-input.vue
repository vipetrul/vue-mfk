<template>
    <!-- <v-container grid-list-md> -->
      <v-layout row wrap >
        <v-flex xs12 d-flex>
          <v-text-field
                    v-for="(el, index) in mfkElements"
                    :key="el.index"
                    v-model="el.value"
                    :name="el.name"
                    :ref="'mfk_field_' + el.index"
                    :label="el.name"
                    :maxlength="el.maxLength"
                    :placeholder="'0'.repeat(el.maxLength)"
                    :mask="'#'.repeat(el.maxLength)"
                    :class="['mfk-input', index== mfkElements.length-1 ? 'mfk-input-last':'' ]"
                    :style="{minWidth: el.minWidth + 'px'}"
                    @input="onInput(el, $event)"
                    @blur= "fillWithZeros(el, $event)"
                  ></v-text-field>
        </v-flex>
      </v-layout>     
    <!-- </v-container> -->
</template>

<script>
export default {
  data: function() {
    return {
      mfkElements: [
        { index: 0, name: "Fund", maxLength: 3, minWidth: 42, value: "" },
        { index: 1, name: "Org", maxLength: 2, minWidth: 30, value: "" },
        { index: 2, name: "Dept", maxLength: 4, minWidth: 52, value: "" },
        { index: 3, name: "Grant/Prgm", maxLength: 8, minWidth: 92, value: "" },
        { index: 4, name: "IAcct", maxLength: 4, minWidth: 52, value: "" },
        { index: 5, name: "OAcct", maxLength: 3, minWidth: 50, value: "" },
        { index: 6, name: "DAcct", maxLength: 5, minWidth: 52, value: "" },
        { index: 7, name: "Fn", maxLength: 2, minWidth: 30, value: "" },
        { index: 8, name: "Cctr", maxLength: 4, minWidth: 44, value: "" }
      ]
    };
  },

  methods: {
    onInput: function(el, $event) {
      if (el.value.length == el.maxLength) this.FocusOnNextField(el.index);
    },
    FocusOnNextField: function(currentImputIndex) {
      let nextField = "mfk_field_" + (currentImputIndex + 1);

      if (nextField in this.$refs) {
        this.$refs[nextField][0].disabled
          ? FocusOnNextField(currentImputIndex + 1)
          : this.$refs[nextField][0].focus();
      }
    },
    fillWithZeros: function(el, $event) {
      el.value = el.value.padEnd(el.maxLength, "0");
    }
  }
};
</script>
<style scoped>
.mfk-input {
  margin-right: 0.3em;
}
.mfk-input-last {
  margin-right: 0em;
}
</style>
