<template>
    <!-- <v-container grid-list-md> -->
      <v-layout row wrap >
        <v-flex xs12 d-flex>
          <v-text-field
                    name="mfk_fund"
                    label="Fund"
                    maxlength="3"
                    placeholder="000"
                    mask="###"
                    class="mfk-input"
                    style="min-width:42px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_org"
                    label="Org"
                    maxlength="2"
                    placeholder="00"
                    mask="##"
                    class="mfk-input"
                    style="min-width:30px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_dept"
                    label="Dept"
                    maxlength="4"
                    placeholder="0000"
                    mask="####"
                    class="mfk-input"
                    style="min-width:52px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_grant"
                    label="Grant/Prgm"
                    maxlength="8"
                    placeholder="00000000"
                    mask="########"
                    class="mfk-input"
                    style="min-width:92px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_iacct"
                    label="IAcct"
                    maxlength="4"
                    placeholder="0000"
                    mask="####"
                    class="mfk-input"
                    style="min-width:52px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_oacct"
                    label="OAcct"
                    maxlength="3"
                    placeholder="000"
                    mask="###"
                    class="mfk-input"
                    style="min-width:50px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_dacct"
                    label="DAcct"
                    maxlength="5"
                    placeholder="00000"
                    mask="#####"
                    class="mfk-input"
                    style="min-width:52px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_fn"
                    label="Fn"
                    maxlength="2"
                    placeholder="00"
                    mask="##"
                    class="mfk-input"
                    style="min-width:30px"
                  ></v-text-field>
          <v-text-field
                    name="mfk_cctr"
                    label="Cctr"
                    maxlength="4"
                    placeholder="0000"
                    mask="####"
                    class="mfk-input mfk-input-last"
                    style="min-width:44px"
                  ></v-text-field>
        </v-flex>
      </v-layout>     
    <!-- </v-container> -->
</template>

<script>
export default {};
</script>

<style scoped>
  .mfk-input {margin-right:0.3em}
  .mfk-input-last {margin-right:0em}
</style>
