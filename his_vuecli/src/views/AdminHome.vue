<template>

    <div class="patienthome">
        <div style="display: flex; justify-content: space-between; line-height: 3rem; padding:1rem 0;">
            <div class="home_top">
                <div><img class="home_img" src="../assets/Choose/HOME1.png"></div>
                <div style="vertical-align: middle;">HIS</div>
            </div>
            <ul class="home_tab">
                <li class="btn" @click="change('主页')"><i class="el-icon-school"></i>首页</li>
                <li class="btn" @click="change('用户管理')"><i class="el-icon-coordinate"></i>用户管理</li>
                <li class="btn" @click="change('帮助')"><i class="el-icon-s-custom"></i>帮助</li>

            </ul>
            <div></div>
        </div>

        <div style="margin: 1rem auto; display: flex;gap:2rem">
            <div class="patienthome_left" >
                <div style="text-align: center">
                    <img src="https://i03piccdn.sogoucdn.com/dc8a5a1e5b364703" style="width: 6rem;height: 6rem;">
                </div>
                <br>
                <div class="key">角色</div>
                <div class="value">Admin</div>
                <div style="text-align: center;margin: 2rem 0">
                    <el-button type="danger" @click="LogOut">退出登陆</el-button>
                </div>
            </div>
            <div class="patienthome_right">
                <div :style="{'display': activeName==='主页'? 'block': 'none'}">主页！！！！！！</div>
                <div @click="activeName='用户管理'" :style="{'display': activeName==='用户管理'? 'block': 'none'}">
                    <div class="patienthome_right_tabs_patientinf_form">
                        <el-button plain>新增用户</el-button>
                        <br>
                        <el-table
                            border
                            stripe
                            :data="users"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="id"
                                label="id"
                                width="120"
                            />
                            <el-table-column
                                prop="username"
                                label="用户名"
                                width="120"
                            />
                            <el-table-column
                                prop="password"
                                label="密码"
                                width="120"
                            />
                            <el-table-column
                                prop="roles"
                                label="角色"
                                width="120"
                            />
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small" @click="updateUser(users[scope.$index].id)">修改</el-button>
                                    <el-button size="small" @click="deleteUser(users[scope.$index].id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>


                <div @click="activeName='帮助'" :style="{'display': activeName==='帮助'? 'block': 'none'}">
                    <h4>帮助界面</h4>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import el from "element-ui/src/locale/lang/el";
import id from "element-ui/src/locale/lang/id";

export default {
    data() {
        return {
            patient_id: '',
            activeName: '主页',
            users: [{
                id: '',
                username: '',
                password: '',
                roles: ''
            }],
            message: ''
        }
    },
    components: {},
    created() {
        this.$axios.get('/checkToken').then(response => {
            //返回值部分
            this.$axios.get('/admin/getAll').then(response => {      //返回值部分
                this.users = response.data.data.map(user => {
                    if (user.roles === 0){
                        user.roles = '管理员';
                    }else if (user.roles === 1){
                        user.roles = '医生';
                    }else if (user.roles === 2){
                        user.roles = '患者';
                    }
                    return user;
                })
            }).catch(error => {
                console.log(error)
            })

        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        change(name) {
            this.activeName = name
        },
        LogOut() {
            function deleteCookie(name) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }

            deleteCookie("token")

            this.$router.push("/")
        },
        addUser(){

        },
        updateUser(index) {
            this.$axios.post("/admin/update",{
                id: this.users.id,

            })
        },
        deleteUser(id){
            this.$axios.post("/admin/delete", this.$qs.stringify({
                id: id
            })).then(response => {
                if (response.data.msg === "success"){
                    window.location.reload(); // 刷新页面
                }
            }).catch(error => {
                console.log(error)
            })
        },
        addPatientConsultation() {
            this.$axios.post('/consultation/add', this.PatientConsultation).then(response => {
                //返回值部分
                // this.reservation = response.data.data
                // this.reservationtotal = response.data.data.length
            }).catch(error => {
                console.log(error)
            })

            this.$axios.post('/patient/editById', this.$qs.stringify({
                    patient_ID: this.patient_id,
                    doctor_ID:this.PatientConsultation.doctorId
                }
            )).then(response => {
                //返回值部分
                this.$alert('', '挂号成功', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            message: `Create C Success`
                        });
                    }
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.btn {
    cursor: pointer;
    user-select: none;
}

.btn:hover {
    border-bottom: #1d8548 1px solid;
}


.patienthome {
    width: 100%;
    padding: 0 2rem;

}

.home_top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;

    line-height: 3rem;
    font-size: 2rem;
    letter-spacing: 2px;
    height: 3rem;
}

.home_img {
    height: 3rem;
}


.home_tab {
    list-style: none;
    display: flex;
    gap: 3rem;
}

.home_tab > li {
    height: 2.5rem;
}

.home_tab i {
    margin-right: 2px;
}

.patienthome_left {
    /*background-color: mintcream;*/
    padding: 1rem 2rem;
    border-right: 1px solid gray;
    height: calc(100vh - 7rem);
}

.patienthome_left .key {
    font-size: 0.8rem;
    color: gray;
    margin-top: 1rem;
    margin-bottom: 0.3rem;
}


.patienthome_right_tabs_patientinf_form {

    width: 4000px;

}


/*    表格可操作核心部分  开药*/
.tb-edit .el-input {
    display: none
}

.tb-edit .current-row .el-input {
    display: block
}

.tb-edit .current-row .el-input + span {
    display: none
}

.tb-edit .el-select {
    display: none
}

.tb-edit .current-row .el-select {
    display: block
}

.tb-edit .current-row .el-select + span {
    display: none
}

/*    表格可操作核心部分 非药品处理*/

.tb-edit2 .el-input {
    display: none
}

.tb-edit2 .current-row .el-input {
    display: block
}

.tb-edit2 .current-row .el-input + span {
    display: none
}

.tb-edit2 .el-select {
    display: none
}

.tb-edit2 .current-row .el-select {
    display: block
}

.tb-edit2 .current-row .el-select + span {
    display: none
}


</style>