//needed for Vuetify
require ('vuetify/src/stylus/app.styl')
import Vuetify from 'vuetify/es5/components/Vuetify'
import VApp from 'vuetify/es5/components/VApp'
import VTextField from 'vuetify/es5/components/VTextField'
import VGrid from 'vuetify/es5/components/VGrid'

import Hello from './Hello.vue'
import MfkInput from './mfk-input.vue'

function plugin(Vue) {
  
  //Use folling components from vuetify
  Vue.use(Vuetify, { components: { VApp, VTextField, VGrid } })
  
  Vue.component('hello', Hello)
  Vue.component('mfk-input', MfkInput)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  VApp,
  VTextField,
  Hello,
  version
}
