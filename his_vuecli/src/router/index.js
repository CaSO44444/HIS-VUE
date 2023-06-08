import Vue from 'vue'
import VueRouter from 'vue-router'
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
import PatientHome from "@/views/PatientHome.vue";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Doctors from "@/views/Doctors.vue";
import News from "@/views/News.vue";
import AdminLogin from "@/views/AdminLogin.vue";



Vue.use(VueRouter)

const routes = [
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
        path: '/Doctors',
        name: 'Doctors',
        component: Doctors
    },
    {
        path: '/News',
        name: 'News',
        component: News
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
        path: '/PatientHome',
        name: 'PatientHome',
        component: PatientHome
    },
    {
        path: '/AdminLogin',
        name: 'AdminLogin',
        component: AdminLogin
    },
]


const cors = require("cors");
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name=== 'AdminLogin'|| to.name === 'PatientLogin' || to.name === 'DoctorLogin' || to.name === 'Home' || to.name === 'News' || to.name === 'Doctors' ||to.name === 'PatientRegister' || to.name ==='DoctorRegister') {
        // 如果是登录界面，则直接允许访问
        next();
    } else {
        const m = String(document.cookie).match(new RegExp('(?:^| )' + 'token' + '(?:(?:=([^;]*))|;|$)'));
        let token = "";
        if (m) {
            token = decodeURIComponent(m[1]);
        }
        console.log(token);
        if (!token) {
            // 如果没有JWT令牌，跳转到'/'路由
            next('/');
        } else {
            const decodedToken = jwt_decode(token);
            const expirationTime = decodedToken.exp * 1000; // JWT的过期时间，单位为毫秒，乘1000是转换成毫秒
            const currentTime = Date.now(); // 当前时间的时间戳，单位为毫秒

            if (currentTime > expirationTime) {
                // JWT已经失效，跳转到登录页面或其他逻辑处理
                console.log('Token已失效');
                next({path: '/'});
            } else {
                // 校验 token 合法性
                axios({
                    url: 'http://127.0.0.1:8080/checkToken',
                    method: 'get',
                    // headers: {
                    //     token: token
                    // }
                })
                    .then(res => {
                        if (res.data.msg !== "success" && res.data.code !== 0) {
                            // 如果校验失败，跳转到错误页面
                            console.log('校验失败');
                            next({path: '/'});
                        } else {
                            // 校验成功，获取角色信息
                            const role = res.data.data.roles; // 假设角色信息在响应的 "role" 字段中

                            // 根据角色进行鉴权处理
                            if (role === '0') {
                                // 管理员角色，允许访问所有路由
                                next();
                            } else if (role === '2') {
                                // 患者角色，允许访问特定路由
                                if (to.name === 'PatientHome' || to.name === 'Patientxxx') {
                                    next();
                                } else {
                                    // 没有权限访问其他路由，跳转到错误页面或其他逻辑处理
                                    next({path: '/PatientHome'});
                                }
                            } else if (role === '1') {
                                // 医生角色，允许访问特定路由
                                if (to.name === 'DoctorHome' || to.name === 'Doctorxxx') {
                                    next();
                                } else {
                                    // 没有权限访问其他路由，跳转到错误页面或其他逻辑处理
                                    next({path: '/DoctorHome'});
                                }
                            } else {
                                // 未知角色，跳转到错误页面或其他逻辑处理
                                next({path: '/'});
                            }
                        }
                    })
                    .catch(error => {
                        // 处理请求错误
                        console.error(error);
                        next({path: '/'});
                    });
            }
        }
    }
});


export default router
