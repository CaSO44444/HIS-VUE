<template>
    <div class="doctorlogin">
        <div class="doctorlogintab">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>医生登录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="doctorlogin_inf">DOCTOR LOGIN</div>
        <div class="doctorlogin_01">
            <div class="doctorlogin_01_form">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名" >
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                      <el-input type="text" placeholder="请输入验证码" v-model="form.verifyCode" required="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-image :src="verificationUrl" fit="contain"></el-image>
                      <el-button type="mini" @click="flushcode">刷新验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登陆</el-button>
                        <el-button @click="nopassword">忘记密码</el-button>
                        <el-button @click="Register">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>

    </div>
</template>

<script>



    export default {
        data(){
            return{
              verificationUrl:"http://127.0.0.1:8080/common/kaptcha?d="+new Date()*1,
                form:{
                    username:'',
                    password:'',
                    verifyCode:''
                }
            }

        },
        methods:{
            onSubmit(){
            //    登陆验证
                this.$axios.post('user/login',
                    this.$qs.stringify(
                        {
                            username:this.form.username,
                            password:this.form.password,
                            verifyCode:this.form.verifyCode,
                        }
                    )
                ).then(response=>{      //返回值部分
                    this.inf = response.data
                    if(this.inf.msg === "success"&&this.inf.data.role === 1){  // 管理员为0，医生为1，患者为2
                        document.cookie = `token=${this.inf.data.token};`;
                        this.$router.push({
                            path:'/DoctorHome'               	//目标URL，为注册的路由
                        })
                    }
                    else {
                        this.$alert('', '登陆失败 权限不匹配', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `no`
                                });
                            }
                        });
                        this.flushcode();
                    }
                    if(this.inf.code === 500){
                        this.$alert('', '登陆失败 账号密码错误', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `no`
                                });
                            }
                        });
                        this.flushcode();
                    }

                }).catch(error=>{
                    console.log(error)
                })
            },
            Register(){
                this.$router.push('/DoctorRegister');
            },
            nopassword(){
                // this.$router.push('/DoctorForgetPassword');
                alert("请联系管理员");
                this.$router.push("/DoctorLogin");
                this.flushcode();
            },
            flushcode(){
                this.verificationUrl="http://127.0.0.1:8080/common/kaptcha?d="+new Date()*1
            }
        },

        components: {

        }}
</script>

<style>
    .doctorlogintab{
        position: absolute;
        left: 300px;
        top: 20px;
        color: #42b983;
        z-index: 9999;

    }
    .doctorlogin{
        position: relative;
        width:1500px;
        height:800px;
    }
    .doctorlogin_inf{
        position: absolute;
        top: 100px;
        left: 50%;
        font-family: "Microsoft YaHei UI";
        font-size: 52px;

    }
    .doctorlogin_01{
        position: absolute;
        /*background-color: #42b983;*/
        top: 170px;
        left: 50%;
        /*width: 400px;*/
        /*height: 300px;*/
    }
    .doctorlogin_01_form{
        margin: 20px;
        position: relative;
        right: 20px;
    }

</style>