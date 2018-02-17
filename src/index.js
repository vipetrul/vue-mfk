import Vuetify from 'vuetify'
import MfkInput from './mfk-input.vue'
import ValidateMfk from './Services/validateMfk'

function plugin(Vue, options) {
  //Use folling components from vuetify
  Vue.use(Vuetify)
  
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
  MfkInput,
  ValidateMfk,
  version
}
