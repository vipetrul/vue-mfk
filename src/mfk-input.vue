<template>
    <div class="mfk-wrapper">
      <mfk-favorite 
          v-if="favorites"
          :value="value" 
          :favorites="favorites"
          :disabled="disabled"
          @favorite-mfk-selected="favoriteMfkSelected"
          @favorite-mfk-added="favoriteMfkAdded"
          @favorite-mfk-removed="favoriteMfkRemoved"
          ></mfk-favorite>
      <div class="mfk-input-wrapper">
        <v-text-field
            v-for="(el, index) in mfkElements"
            v-model="el.value"
            v-themask="'#'.repeat(el.maxLength)"
            :key="el.index"
            :name="el.name"
            :ref="'mfk_field_' + el.index"
            :label="el.name"
            :maxlength="el.maxLength"
            :placeholder="'0'.repeat(el.maxLength)"
            :class="['mfk-input', index== mfkElements.length-1 ? 'mfk-input-last':'' ]"
            :style="{minWidth: el.minWidth + 'px', width:el.minWidth + 'px'}"
            :error="anyErrors"
            :error-messages="el.index == 0 && anyErrors ? [errorToDisplay] : []"
            :disabled="el.disabled"
            @input="onInput"
            @keydown.native="onKeyDown(el, $event)"
            @keyup="goToNextInput(el, $event)"
            @paste="pasteMfk(el,$event)"
          ></v-text-field>
      </div>
    </div>
</template>

<script>
import validateMfkFunc from './Services/validateMfk';
import MfkFavotire from './mfk-favorite.vue'
import _ from 'lodash';
import {mask} from 'vue-the-mask'

let safeKeys = ['Tab','Shift','ArrowLeft','ArrowRight','Control','Alt','Backspace','Delete'];

export default {
  directives: {
    themask:  mask
  },
  components:{
    'mfk-favorite': MfkFavotire
  },
  props:{
    value:String, //mfk input
    validate:{ //validate mfk yes/no
      type:Boolean,
      default:true
    },
    disabled:{
      type:Boolean,
      default:false
    },
    disabledFields:{
      type:Array,
      default:function(){return []},
    },
    errorMessage:{
      type:String,
      default:null
    },
    favorites: {
      type: Array,
      required: false
    },
  },
  data: function(){
    return {
      mfkError : '',
      mfkDefinition : [
        { index: 0, name: "Fund", maxLength: 3, minWidth: 36, value: "" },
        { index: 1, name: "Org", maxLength: 2, minWidth: 26, value: "" },
        { index: 2, name: "Dept", maxLength: 4, minWidth: 42, value: "" },
        { index: 3, name: "SubDept", maxLength: 5, minWidth: 54, value: "" },
        { index: 4, name: "Grant/Prg", maxLength: 8, minWidth: 78, value: "" },
        { index: 5, name: "IAcct", maxLength: 4, minWidth: 42, value: "" },
        { index: 6, name: "OAcct", maxLength: 3, minWidth: 38, value: "" },
        { index: 7, name: "DAcct", maxLength: 5, minWidth: 50, value: "" },
        { index: 8, name: "Fn", maxLength: 2, minWidth: 26, value: "" },
        { index: 9, name: "Cctr", maxLength: 4, minWidth: 38, value: "" }
      ]}
  },
  computed:{
    anyErrors : function(){
      return this.errorToDisplay ? true : false;
    },
    mfkString : function(){
      return this.mfkElements.map(a => a.value).join('-');
    },
    errorToDisplay: function(){
       if(this.errorMessage != null)
          //if external errorMessage is set (i.e. not null) 
          //it always takes priority over mfk validation error 
          return this.errorMessage; 
       else
          return this.mfkError; }, 
    mfkElements : function(){
      let mfkParts = (this.value||'').split('-');
      this.mfkDefinition.forEach((el)=>{
        el.value = mfkParts[el.index] || '';
        el.disabled = this.disabled || this.disabledFields.includes(el.index);
        });
      return this.mfkDefinition; 
    },
    //proper way to handle debounce
    //https://forum.vuejs.org/t/issues-with-vuejs-component-and-debounce/7224/8
    validateMfk(){ return _.debounce(function(){ 
      validateMfkFunc(this.mfkString)
        .then(() => this.mfkError = null)
        .catch(error => this.mfkError = error )
        .finally(() => this.$emit('update:errorMessage', this.mfkError));
      },1300)}
  },
  methods: {
    onInput: function() {
      this.emitValueChanged();
    },
    emitValueChanged:function(){
      this.$emit('input', this.mfkString);
    },
    goToNextInput: function(el, $event){
      if(safeKeys.includes($event.key)) return; //these keys used for form navigation, so leave them alone
      if (el.value.length == el.maxLength) this.FocusOnNextField(el.index);
    },
    FocusOnNextField: function(currentImputIndex) {
      let nextField = "mfk_field_" + (currentImputIndex + 1);

      if (nextField in this.$refs) {
        if ( this.$refs[nextField][0].disabled ) //skip field if it is disabled
          { this.FocusOnNextField(currentImputIndex + 1) } //try focusing on next field
          else
          { 
            this.$refs[nextField][0].focus(); 
          }
      }
    },
    onKeyDown: function(el, $event){
      if ($event.key == "Tab" && $event.shiftKey==false) { this.fillWithZeros(el); return; }
    },
    fillWithZeros: function(el) {
        el.value = el.value === undefined ? '' : el.value.padEnd(el.maxLength, "0");
        this.emitValueChanged();
    },
    pasteMfk: function(el, $event){
      let pastedValue = $event.clipboardData.getData('text/plain');
      //if pasting to any but first field, use default behaviour
      if(el.index != 0) return;

      $event.preventDefault();
      
      let mfkParts = this.parseMfkParts(pastedValue);
      this.applyInternalInput(mfkParts);
    },
    parseMfkParts: function(mfkString){
      let justNumbers = mfkString.replace(/\D/g,"");
      let startPosition = 0;
      let result = [];
       this.mfkDefinition.forEach( el => {
         result.push(justNumbers.substring( startPosition, startPosition + el.maxLength));
         startPosition = startPosition + el.maxLength;
       });
      
      return result;
    },
    applyInternalInput:function(mfkParts){
      this.mfkDefinition.forEach( el => {
          if (!el.disabled) { //internal input should not modify disabled fields
          el.value = mfkParts[el.index];
          }
      });
      this.emitValueChanged();
    },
    favoriteMfkSelected: function(faveMfk){
      let mfkParts = faveMfk.split('-');
      this.applyInternalInput(mfkParts);
    },
    favoriteMfkAdded: function(faveMfk){
      this.$emit('favorite-mfk-added', faveMfk);
    },
    favoriteMfkRemoved: function(faveMfk){
      this.$emit('favorite-mfk-removed', faveMfk);
    }
  },
  watch:{
    value:function(oldValue, newValue){
      if(this.validate)
      {
        this.validateMfk();
      }
    }
  }

};
</script>
<style scoped>
.mfk-wrapper {display:flex; white-space: nowrap}
.mfk-input-wrapper {display:inline-flex ; flex:1 1 auto;}
.mfk-input { padding-right: 0.3em; flex-basis: auto }

.mfk-input-last {
  padding-right: 0em;
}

/* error message is displayed from fist field, so we need to make sure overflow is not hidden */
.mfk-input >>> .input-group__details {
  white-space: nowrap; overflow: visible;
  }

.mfk-input >>> label {min-width: 120%;}
.mfk-input >>> input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>
