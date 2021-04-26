import Vue from 'vue'
import md5 from 'js-md5'
import App from './App.vue'
import router from './router'
import {
  Button, Form, Field, Toast, Icon, Grid, GridItem, AddressList, AddressEdit,
  Swipe, SwipeItem, SwipeCell, PullRefresh, List, Tab, Tabs, Image
} from 'vant'
import 'lib-flexible/flexible'

Vue.use(Form).use(Field).use(Toast).use(Button).use(Icon).use(GridItem).use(Grid).use(AddressList)
  .use(AddressEdit).use(Swipe).use(SwipeItem).use(SwipeCell).use(PullRefresh).use(List).use(Tab).use(Tabs)
  .use(Image)
Vue.prototype.$md5 = md5
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')