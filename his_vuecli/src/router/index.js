import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About'
import Home from '../views/Home.vue'
import DoctorLogin from '../views/DoctorLogin.vue'
import PatientLogin from '../views/PatientLogin.vue'
import DoctorRegister from '../views/DoctorRegister.vue'
import PatientRegister from '../views/PatientRegister.vue'
import DoctorForgetPassword from '../views/DoctorForgetPassword.vue'
import PatientForgetPassword from '../views/PatientForgetPassword.vue'
import DoctorChangePassword from '../views/DoctorChangePassword.vue'
import PatientChangePassword from '../views/PatientChangePassword.vue'
import DoctorHome from '../views/DoctorHome.vue'
import AdminHome from '../views/AdminHome.vue'
import CashierHome from '../views/AddMedicine.vue'
import DoctorTestHome from '../views/DoctorTestHome.vue'
import DoctorInspectionHome from '../views/DoctorInspectionHome.vue'
import DoctorDrugHome from '../views/DoctorDrugHome.vue'
import DoctorHomeold from "@/views/DoctorHomeold.vue";
import PatientHome from "@/views/PatientHome.vue";
import axios from "axios";


Vue.use(VueRouter)

const routes = [
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/DoctorLogin',
    name: 'DoctorLogin',
    component: DoctorLogin
  },
  {
    path: '/PatientLogin',
    name: 'PatientLogin',
    component: PatientLogin
  },
  {
    path: '/DoctorRegister',
    name: 'DoctorRegister',
    component: DoctorRegister
  },
  {
    path: '/Doctortest1',
    name: 'DoctorHomeold',
    component: DoctorHomeold
  },
  {
    path: '/PatientRegister',
    name: 'PatientRegister',
    component: PatientRegister
  },
  {
    path: '/DoctorForgetPassword',
    name: 'DoctorForgetPassword',
    component: DoctorForgetPassword
  },
  {
    path: '/PatientForgetPassword',
    name: 'PatientForgetPassword',
    component: PatientForgetPassword
  },
  {
    path: '/DoctorChangePassword',
    name: 'DoctorChangePassword',
    component: DoctorChangePassword
  },
  {
    path: '/PatientChangePassword',
    name: 'PatientChangePassword',
    component: PatientChangePassword
  },
  {
    path: '/DoctorHome',
    name: 'DoctorHome',
    component: DoctorHome
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/CashierHome',
    name: 'CashierHome',
    component: CashierHome
  },
  {
    path: '/PatientHome',
    name: 'PatientHome',
    component: PatientHome
  },
  {
    path: '/DoctorInspectionHome',
    name: 'DoctorInspectionHome',
    component: DoctorInspectionHome
  },
  {
    path: '/DoctorDrugHome',
    name: 'DoctorDrugHome',
    component: DoctorDrugHome
  },
]




const cors = require("cors");
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'PatientLogin' || to.name === 'DoctorLogin' || to.name === 'Home') {
    // 如果是登录界面，则直接允许访问
    next();
  }
  else {
    const m = String(document.cookie).match(new RegExp('(?:^| )' + 'token' + '(?:(?:=([^;]*))|;|$)'));
    let token = "";
    if (m){
      token = decodeURIComponent(m[1]);
    }
    console.log(token)
    if (!token) {
      // 如果没有JWT令牌，跳转到'/'路由
      next('/');
    } else {
      // 校验 token 合法性
      axios({
        url: 'http://172.27.5.126:8080/checkToken',
        method: 'get',
        headers: {
          token: token
        }
      }).then(res => {
            if (res.data.data != 202) {
              // 如果校验失败，跳转到错误页面
              console.log('校验失败');
              next({ path: '/' });
            } else {
              // 校验成功，允许访问路由
              next();
            }
          })
          .catch(error => {
            // 处理请求错误
            console.error(error);
            next({ path: '/' });
          });
    }
  }
});

export default router
