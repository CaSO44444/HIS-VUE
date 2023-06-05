<template>

    <div class="patienthome">
        <el-row type="flex" justify="end">
            <el-button @click="LogOut">退出登陆</el-button>
        </el-row>
        <div class="patienthome_lect">
            个人信息
            <br><br>
            <el-table
                border
                stripe
                :data="patientObject"
                style="width: 100%"
                :cell-style="{ padding: '1px 0' }"
            >
                <el-table-column prop="name" label="姓名" width="120" ></el-table-column>
                <el-table-column prop="tel" label="电话" width="120"></el-table-column>
                <el-table-column prop="id_card" label="身份证" width="180">
                </el-table-column>
            </el-table>

        </div>
        <div class="patienthome_right">
            <el-tabs v-model="activeName" type="card" class="patienthome_right_tabs">

                <el-tab-pane label="首页" name="first">主页！！！！！！</el-tab-pane>
                <el-tab-pane label="预约" name="second">
                    <div class="patienthome_right_tabs_patientinf_form">
                        <el-table
                                border
                                stripe
                                :data="reservation"
                                style="width: 100%"
                        >
                            <el-table-column
                                    prop="id"
                                    label="编号id"
                                    width="120"
                            />
                            <el-table-column
                                    prop="doctor.doctor_name"
                                    label="负责人"
                                    width="120"
                            />
                            <el-table-column
                                    prop="dept.dept_name"
                                    label="部门"
                                    width="120"
                            />
                            <el-table-column
                                    prop="title.title_name"
                                    label="职称"
                                    width="120"
                            />
                            <el-table-column
                                    prop="day"
                                    label="可预约天数"
                                    width="120"
                            />
                            <el-table-column
                                    prop="size"
                                    label="人数限制"
                                    width="120"
                            />
                            <el-table-column
                                    prop="status"
                                    label="状态"
                                    width="120"
                            />
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button size="small" @click="resehandleEdit(scope.$index)">挂号</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="挂号" name="third">
                    <el-form ref="form" :model="PatientConsultation" label-width="160px">
                        <!--          <el-col :span="12">-->
                        <!--            <el-form-item label="部门">-->
                        <!--              <el-input v-model="PatientConsultation.type" @input="$forceUpdate()"></el-input>-->
                        <!--            </el-form-item>-->
                        <!--          </el-col>-->
                        <el-col :span="12">
                            <el-form-item label="负责医生">
                                <el-input v-model="PatientConsultation.doctorName" @input="$forceUpdate()"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="门诊编号">
                                <el-input v-model="PatientConsultation.con_num" @input="$forceUpdate()"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="患者名称">
                                <el-input v-model="PatientConsultation.patientName" @input="$forceUpdate()"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="会诊科室">
                                <el-input v-model="PatientConsultation.deptName" @input="$forceUpdate()"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="金额">
                                <el-input v-model="PatientConsultation.money" @input="$forceUpdate()"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="时间">
                                <el-date-picker
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期" v-model="PatientConsultation.time"
                                        @input="$forceUpdate()"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-button type="primary" @click="addPatientConsultation">挂号</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="费用支付" name="fourth"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import th from "element-ui/src/locale/lang/th";
import axios from "axios";

export default {
    data() {
        return {
            patient_id: '',
            activeName: '',
            reservationtotal: '',
            Patient: {
                name: '',
                id: '',
            },
            patientstotal: '',
            patientObject: {
                name: '',
                tel: '',
                id_card: ''
            },
            reservation: [
                {
                    day: '',
                    dept: {
                        dept_id: '',
                        dept_name: ''
                    },
                    doctor: {
                        doctor_id: '',
                        doctor_name: ''
                    },
                    id: '',
                    size: '',
                    status: '',
                    title: {
                        title_id: '',
                        title_name: ''
                    }
                }
            ],
            PatientConsultation: {
                type: '',
                con_num: '',
                patientId: '',
                patientName: '',
                deptId: '',
                deptName: '',
                bed_num: '',
                doctorId: '',
                doctorName: '',
                money: '',
                time: '',
                medicineId: '',
                pay: '',
                status: '',
            },
        }
    },
    components: {},
    created() {
        this.$axios.get('/checkToken').then(response => {
          //返回值部分
          this.patient_id  = response.data.data.id
          this.activeName = 'first'
          this.$axios.get('/reservation/query').then(response => {      //返回值部分
            this.reservation = response.data.data
            this.reservationtotal = response.data.data.length
          }).catch(error => {
            console.log(error)
          })

          this.$axios.post('/patient/queryById',this.$qs.stringify({
            id: this.patient_id
          })).then(response => {      //返回值部分
            this.patientObject = response.data.data
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
    },
    methods: {
        LogOut() {
            function deleteCookie(name) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }

            deleteCookie("token")

            this.$router.push("/")
        },
        resehandleEdit(index) {
            this.activeName = 'third'
            this.PatientConsultation.type = this.reservation[index].type
            this.PatientConsultation.doctorName = this.reservation[index].doctor.doctor_name
            this.PatientConsultation.patientName = this.Patient.name
            this.PatientConsultation.deptName = this.reservation[index].dept.dept_name

        },
        addPatientConsultation() {
            console.log(this.PatientConsultation)
            this.$axios.post('/consultation/add', this.PatientConsultation).then(response => {
                console.log(response.data)
                //返回值部分
                // this.reservation = response.data.data
                // this.reservationtotal = response.data.data.length
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
<style>
.patienthome_lect{
    position: absolute;
    /*background-color: #42b983;*/
    height: 300px;
    border-top: 1px solid black;
}

.patienthome_right {
    position: absolute;
    left: 500px;
    /*z-index: 9999;*/
    right: 10px;
    height: 100%;
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