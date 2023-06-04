<template>
    <div class="doctorregister">
        <div class="doctortabregister">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/DoctorLogin' }">医生登录</el-breadcrumb-item>
                <el-breadcrumb-item>医生注册</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="doctorregisterform">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" ></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="sure_password">
                    <el-input type="password" v-model="ruleForm.check_password" ></el-input>
                </el-form-item>

              <el-form-item label="验证码">
                <el-input type="text" placeholder="请输入验证码" v-model="ruleForm.verifyCode" required="true"></el-input>
              </el-form-item>
              <el-form-item>
                <el-image :src="verificationUrl" fit="contain"></el-image>
                <el-button type="mini" @click="flushcode">刷新验证码</el-button>
              </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-radio-group v-model="ruleForm.role">
                        <el-radio label="医生"></el-radio>
                    </el-radio-group>
                </el-form-item>

<!--                <el-form-item label="身份证号" prop="ducard">-->
<!--                    <el-input v-model="ruleForm.ducard"></el-input>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="电话号码" prop="duphone">-->
<!--                    <el-input v-model="ruleForm.duphone"></el-input>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="住址" prop="duaddress">-->
<!--                    <el-input v-model="ruleForm.duaddress"></el-input>-->
<!--                </el-form-item>-->

                <el-form-item label="科室" prop="departmentname">
                    <el-select v-model="ruleForm.departmentname" placeholder="请选择科室" style="margin-left: 20px">

                        <ul v-for="(item,index) in department" >

                            <el-option :label="item" :value="item"></el-option>


                        </ul>

                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="returnoff()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>

export default {
    created() {
        //找到所有的品牌
        this.$axios.get('dept/query',

        ).then(response=>{      //返回值部分
            this.department = response.data.data
        }).catch(error=>{
            console.log(error)
        })

    },
    data() {

        {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.check_password !== '') {
                        this.$refs.ruleForm.validateField('dusure_password');
                    }
                    callback();
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };


            var checkphone = function (phone) {
                var pattern =  /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;   //验证手机号
                if (!pattern.test(phone)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            //验证手机
            var validatePhone =(rule, value, callback)=>{
                if (value === '') {
                    callback(new Error('请输入电话号码'));
                }
                else if(checkphone(value) === false){
                    callback(new Error('电话号码格式错误!'));
                }
                else{
                    callback();
                }
            };
            var checkemail = function(email) {
                var pattern =   /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;   //验证身份证号
                if (!pattern.test(email)) {
                    return false;
                }
                else {
                    return true;
                }
            }

            var validateEmail =(rule, value, callback)=>{
                if (value === '') {
                    callback(new Error('请输入身份证号'));
                }
                else if(checkemail(value) === false){
                    callback(new Error('身份证号错误!'));
                }
                else{
                    callback();
                }
            };
        }

        return {
            verificationUrl:"http://127.0.0.1:8080/common/kaptcha?d="+new Date()*1,
            department:{},
            ruleForm: {
                username:'',
                password:'',
                check_password:'',
                role:'',
                verifyCode:'',
                departmentname:'',
            },
            inf:'',

            rules: {
                username: [
                    { required: true, message: '请输入注册账号', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                check_password: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                departmentname: [
                    { required: true, message: '请选择科室', trigger: 'change' }
                ],
            }
        };
    },
    methods: {
        returnoff(){
            this.$router.push('/DoctorLogin');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //执行正确操作
                    if(this.ruleForm.role === "医生"){
                        this.ruleForm.role = 1
                    }
                    else{
                        this.ruleForm.role = 0
                    }
                    // console.log(this.ruleForm)
                    this.$axios.post('/user/register', this.$qs.stringify(this.ruleForm)).then(response=>{      //返回值部分
                        this.inf = response.data
                        if(this.inf.msg === "success"){
                            //弹窗
                            this.$alert('', '创建成功', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'info',
                                        message: `Create User Success`
                                    });
                                }
                            });

                            this.$router.push('/DoctorLogin');
                        }
                        if(this.inf === "phone"){
                            this.$alert('', '创建失败 电话已被注册', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        message: `Create User false`
                                    });
                                }
                            });
                        }

                        if(this.inf.msg === "两次输入密码不一致"){
                            this.$alert('', '两次输入密码不一致', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        message: `Create User false`
                                    });
                                }
                            });
                        }

                        if(this.inf.msg === "用户名已存在"){
                            this.$alert('', '创建失败 账号已被注册', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        message: `Create User false`
                                    });
                                }
                            });
                        }
                    }).catch(error=>{
                        console.log(error)
                    })






                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '请正确填写信息'
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

    }
}
</script>

<style>
.doctorregister{
    position: absolute;
    width: 650px;
    left: 400px;
}
.doctortabregister{
    position: absolute;
    left: -250px;
    top: 20px;
    color: #42b983;
    z-index: 99999;
}
.doctorregisterform{
    position: relative;
    top: 50px;
}
</style>



