<template>
    <v-layout row class="mfk-input-wrapper">
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
                :style="{minWidth: el.minWidth + 'px', width:el.minWidth + 'px'}"
                @input="onInput"
                @blur= "fillWithZeros(el, $event)"
                @keyup="goToNextInput(el, $event)"
                :error="isMfkError"
                :rules="[() => el.index == 0 ? 'somethng else?' :'']"
              ></v-text-field>
    </v-layout>
</template>

<script>
import validateMfkFunc from './Services/validateMfk';
import _ from 'lodash';

export default {
  props:{
    value:String //mfk input
  },
  data: function(){
    return {
      mfkError : '',
      mfkDefinition : [
        { index: 0, name: "Fund", maxLength: 3, minWidth: 42, value: "" },
        { index: 1, name: "Org", maxLength: 2, minWidth: 30, value: "" },
        { index: 2, name: "Dept", maxLength: 4, minWidth: 52, value: "" },
        { index: 3, name: "Grant/Prg", maxLength: 8, minWidth: 78, value: "" },
        { index: 4, name: "IAcct", maxLength: 4, minWidth: 52, value: "" },
        { index: 5, name: "OAcct", maxLength: 3, minWidth: 50, value: "" },
        { index: 6, name: "DAcct", maxLength: 5, minWidth: 52, value: "" },
        { index: 7, name: "Fn", maxLength: 2, minWidth: 30, value: "" },
        { index: 8, name: "Cctr", maxLength: 4, minWidth: 44, value: "" }
      ]}
  },
  computed:{
    isMfkError : function(){
      return this.mfkError ? true : false;
    },
    mfkString : function(){
      return this.mfkElements.map(a => a.value).join('-');
    },
    mfkElements : function(){
      let mfkParts = (this.value||'').split('-');
      this.mfkDefinition.forEach(el => el.value = mfkParts[el.index] || '');
      return this.mfkDefinition; 
    }
  },
  methods: {
    onInput: function() {
      this.emitEvent();
      console.log("Calling Validate MFK");
      this.validateMfk();
    },
    emitEvent:function(){
      this.$emit('input', this.mfkString);
    },
    validateMfk: _.debounce(function(){
      validateMfkFunc(this.mfkString).catch(error => this.mfkError = error);
      },500),
    goToNextInput: function(el, $event){
      if(['Tab','Shift','ArrowLeft','ArrowRight'].includes($event.key)) return; //these keys used for form navigation, so leave them alone
      if (el.value.length == el.maxLength) this.FocusOnNextField(el.index);
    },
    FocusOnNextField: function(currentImputIndex) {
      let nextField = "mfk_field_" + (currentImputIndex + 1);

      if (nextField in this.$refs) {
        if ( this.$refs[nextField][0].disabled ) //skip field if it is disabled
          { FocusOnNextField(currentImputIndex + 1) } //try focusing on next field
          else
          { 
            this.$refs[nextField][0].focus(); 
          }
      }
    },
    fillWithZeros: function(el, $event) {
      if(el.value.length != el.maxLength){
        el.value = el.value === undefined ? '' : el.value.padEnd(el.maxLength, "0");
        this.emitEvent();
      }
    }
  }

};
</script>
<style scoped>
.mfk-input { margin-right: 0.3em; flex-basis: auto }

.beforeMfk:empty {display: none}
.beforeMfk { display: inline-block; padding-right: 0.3em; }

.mfk-input-last {
  margin-right: 0em;
}

/* error message is displayed from fist field, so we need to make sure overflow is not hidden */
.mfk-input >>> .input-group__details {
  white-space: nowrap; overflow: visible;
  }
</style>
