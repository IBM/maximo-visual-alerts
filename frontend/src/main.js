import Vue from 'vue'
import App from './App.vue'
// import VFC from 'vfc'
import VModal from 'vue-js-modal'

// import Modal from './components/Modal.vue'
// import card from 'vue-card'

// import 'vuetify/dist/vuetify.min.css'
// import vuetify from './plugins/vuetify';
// Vue.use(Vuetify)
// import 'vuetify/dist/vuetify.min.css'


import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import VueMaterial from 'vue-material'
const VueUploadComponent = require('vue-upload-component')
// Vue.use(VueMaterial)
import { Plotly } from 'vue-plotly'
import JSZip from 'jszip'
import jsPDF from 'jspdf'
// import jsmpeg from './assets/jsmpeg.min.js' //'jsmpeg'
import JSMpeg from '@cycjimmy/jsmpeg-player';

import DetailedInferenceView from './components/DetailedInferenceView'
import Drag from './components/Drag'
import Router from 'vue-router'

import "carbon-components/css/carbon-components.min.css";
import CarbonComponentsVue from '@carbon/vue';
// let carbonLibs = ["CvList", "CvModal", "CvSelect", "CvFileUploader", "CvDataTable", "CvDataTableCell", "CvDataTableRow", "CvAccordion", "CvAccordionItem", "CvButton", "CvTag", "CvStructuredList"]
Vue.use(CarbonComponentsVue, ["CvDataTableSkeleton", "CvInteractiveTooltip", "CvCheckbox", "CvSlider", "CvNumberInput" ,"CvInlineLoading", "CvModal", "CvTag", "CvTile", "CvSelect", "CvMultiSelect","CvSelectOption", "CvSelectOptGroup", "CvFileUploader", "CvDataTable", "CvDataTableCell", "CvDataTableRow", "CvButton", "CvForm", "CvTextArea", "CvTextInput","CvSearch", "CvHeader", "CvHeaderName", "CvHeaderNav", "CvHeaderMenu", "CvHeaderMenuItem", "CvHeaderNav",
"CvHeaderPanel", "CvHeaderGlobalAction",
"CvSwitcher",
"CvSwitcherItem",
"CvSwitcherItemLink",
"CvSkipToContent",
"CvButtonSet",
"CvContentSwitcher",
"CvContentSwitcherButton",
"CvIconButton",
"CvSvg",
"CvInteractiveTooltip",
"CvHeaderMenuButton"]);




import { CarbonIconsVue } from '@carbon/icons-vue';
import CalendarSettings32 from '@carbon/icons-vue/es/calendar--settings/32';
import Settings32 from '@carbon/icons-vue/es/settings/32';

import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20';

import Login20 from '@carbon/icons-vue/es/login/20';

import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';

import Notification20 from '@carbon/icons-vue/es/notification/20';

import NotificationNew20 from '@carbon/icons-vue/es/notification--new/20';

import Search20 from '@carbon/icons-vue/es/search/20';

import Filter16 from '@carbon/icons-vue/es/filter/16';

import WarningFilled32 from '@carbon/icons-vue/es/warning--filled/32';

import Restart32 from '@carbon/icons-vue/es/restart/32';

Vue.use(CarbonIconsVue, {
    components: {
      CalendarSettings32,
      Settings32,
      UserAvatar20,
      Login20,
      Search20,
      AppSwitcher20,
      Notification20,
      Filter16,
      WarningFilled32,
      NotificationNew20,
      Restart32
    }
})

// <CalendarSettings32 />
import "./ibm-plex-font.css";
import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
Vue.use(chartsVue);

/*
import {CvModal, CvList, CvSelect, CvFileUploader, CvDataTable, CvAccordion, CvAccordionItem, CvButton} from "@carbon/vue"
, */

// */

// import InfTable from './components/InfTable.vue';
// Vue.use(InfTable)
// Vue.component('inf-table', InfTable)

Vue.use(Drag)
Vue.component('drag', Drag)
// Vue.component('v-select', vSelect)

// Vue.component("vuetable", Vuetable);
// Vue.component("vuetable-pagination", VuetablePagination);
// Vue.component("vuetable-pagination-dropdown", VuetablePaginationDropDown);
// Vue.component("vuetable-pagination-info", VuetablePaginationInfo);

Vue.config.productionTip = false

// Vue.use(VFC)
Vue.use(VModal)
Vue.use(Router)
Vue.component('Plotly', Plotly)
// Vue.use(SuiVue);

Object.defineProperty(Vue.prototype, '$JSZip', { value: JSZip });
Object.defineProperty(Vue.prototype, '$jsPDF', { value: jsPDF });
Vue.use(JSZip, "$JSZip")


// import Youtube from './components/Youtube.js'
// Vue.use(Youtube, "$Youtube")

// import OpenCV from './components/OpenCV.js'
// Vue.use(OpenCV, "$OpenCV")


// import tracking from 'tracking'
// Object.defineProperty(Vue.prototype, '$tracking', { value: tracking });

// import tracking from 'tracking'
// Object.defineProperty(Vue.prototype, '$Tracking', { value: Tracking });
// Vue.use(Tracking, "$Tracking")
// Vue.use(require('tracking'))


// Object.defineProperty(Vue.prototype, '$JSMpeg', { value: JSMpeg });

new Vue({
  render: h => h(App),

  data: function() {
    return {
      showModal: false
      // css: CssForBootstrap4
    }
  }
}).$mount('#app')

// const router = new Router({
//   routes: [
//     // {
//     //   path: '/inference/:inferenceId',
//     //   name: 'inference',
//     //   component: DetailedInferenceView
//     // },
//     {
//       path: '/',
//       name: 'app',
//       component: App
//     }
//   ]
// })
//
// new Vue({
//   render: h => h(App),
//
//   router,
//   // vuetify,
//   // components: {FileUpload: VueUploadComponent},
//   // data: function() {
//   //   return {
//   //     showModal: false
//   //   }
//   // }
// }).$mount('#app')
