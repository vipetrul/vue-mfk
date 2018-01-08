//needed for Vuetify
require ('vuetify/src/stylus/app.styl')
import Vuetify from 'vuetify/es5/components/Vuetify'
import VApp from 'vuetify/es5/components/VApp'
import VTextField from 'vuetify/es5/components/VTextField'
import VGrid from 'vuetify/es5/components/VGrid'
import VBtn from 'vuetify/es5/components/VBtn'
import VBtnToggle from 'vuetify/es5/components/VBtnToggle'
import VIcon from 'vuetify/es5/components/VIcon'
import VSelect from 'vuetify/es5/components/VSelect'

import Hello from './Hello.vue'
import MfkInput from './mfk-input.vue'
import MfkFavotire from './mfk-favorite.vue'

function plugin(Vue) {
  
  //Use folling components from vuetify
  Vue.use(Vuetify, { components: { VApp, VTextField, VGrid, VBtn, VBtnToggle, VIcon, VSelect } })
  
  Vue.component('hello', Hello)
  Vue.component('mfk-input', MfkInput)
  Vue.component('mfk-favorite', MfkFavotire)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  MfkInput,
  MfkFavotire,
  VApp,
  VTextField,
  VBtn,
  VBtnToggle,
  VIcon,
  VSelect,
  Hello,
  version
}
