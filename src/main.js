import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Container,
  Aside,
  Header,
  Main,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';
import router from '@/router/index';
import store from '@/store/index';
import http from 'axios';
import "@/api/mock"
import '@/assets/less/index.less';

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag)
Vue.use(Form);
Vue.use(FormItem)
Vue.use(Input);
Vue.use(Select);
Vue.use(Option)
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;


router.beforeEach((to, from, next)=>{

  store.commit("getToken");
  const token = store.state.user.token;

  if(!token && to.name !== "login"){
    next({name:"login"})
  }else if(token && to.name === "login"){
    next({name:"main"})
  }else{
    next()
  }
})
new Vue({
  render: h => h(App),
  store,
  router,
  created(){
    store.commit("addMenu", router)
  }
}).$mount('#app')