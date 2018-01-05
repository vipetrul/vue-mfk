<template>
    <!-- <v-container grid-list-md> -->
      <v-layout row wrap >
        <v-flex xs12 d-flex>
          <v-text-field
                    v-model="mfk_fund"
                    name ="mfk_fund"
                    label="Fund"
                    maxlength="3"
                    placeholder="000"
                    mask="###"
                    class="mfk-input"
                    style="min-width:42px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,3,'mfk_org')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_org"
                    name="mfk_org"
                    ref="mfk_org"
                    label="Org"
                    maxlength="2"
                    placeholder="00"
                    mask="##"
                    class="mfk-input"
                    style="min-width:30px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,2,'mfk_dept')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_dept"
                    name="mfk_dept"
                    ref="mfk_dept"
                    label="Dept"
                    maxlength="4"
                    placeholder="0000"
                    mask="####"
                    class="mfk-input"
                    style="min-width:52px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,4,'mfk_grant')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_grant"
                    name="mfk_grant"
                    ref="mfk_grant"
                    label="Grant/Prgm"
                    maxlength="8"
                    placeholder="00000000"
                    mask="########"
                    class="mfk-input"
                    style="min-width:92px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,8,'mfk_iacct')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_iacct"
                    name="mfk_iacct"
                    ref="mfk_iacct"
                    label="IAcct"
                    maxlength="4"
                    placeholder="0000"
                    mask="####"
                    class="mfk-input"
                    style="min-width:52px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,4,'mfk_oacct')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_oacct"
                    name="mfk_oacct"
                    ref="mfk_oacct"
                    label="OAcct"
                    maxlength="3"
                    placeholder="000"
                    mask="###"
                    class="mfk-input"
                    style="min-width:50px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,3,'mfk_dacct')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_dacct"
                    name="mfk_dacct"
                    ref="mfk_dacct"
                    label="DAcct"
                    maxlength="5"
                    placeholder="00000"
                    mask="#####"
                    class="mfk-input"
                    style="min-width:52px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,5,'mfk_fn')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_fn"
                    name="mfk_fn"
                    ref="mfk_fn"
                    label="Fn"
                    maxlength="2"
                    placeholder="00"
                    mask="##"
                    class="mfk-input"
                    style="min-width:30px"
                    @blur= "fillWithZeros"
                    @input="onFullGoTo($event,2,'mfk_cctr')"
                  ></v-text-field>
          <v-text-field
                    v-model="mfk_cctr"
                    name="mfk_cctr"
                    ref="mfk_cctr"
                    label="Cctr"
                    maxlength="4"
                    placeholder="0000"
                    mask="####"
                    class="mfk-input mfk-input-last"
                    style="min-width:44px"
                    @blur= "fillWithZeros"
                  ></v-text-field>
        </v-flex>
      </v-layout>     
    <!-- </v-container> -->
</template>

<script>
export default {
  data: function() { 
    return {
      mfk_fund:"",
      mfk_org:"",
      mfk_dept:"",
      mfk_grant:"",
      mfk_iacct:"",
      mfk_oacct:"",
      mfk_dacct:"",
      mfk_fn:"",
      mfk_cctr:""
      }
  },

  methods: {
    onFullGoTo : function(value, maxLength, goto){
      if(value.length == maxLength)
        this.$refs[goto].focus();
    },
    fillWithZeros : function($event){
      let el = $event.target;
      this[el.name] = el.value.padEnd(el.maxLength,"0");
    }
  }
}
</script>
<style scoped>
  .mfk-input {margin-right:0.3em}
  .mfk-input-last {margin-right:0em}
</style>
