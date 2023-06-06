<template>

  <div class="patienthome">
    <div style="display: flex; justify-content: space-between; line-height: 3rem; padding:1rem 0;">
      <div class="home_top">
        <div><img class="home_img" src="../assets/Choose/HOME1.png"></div>
        <div style="vertical-align: middle;">HIS</div>
      </div>
      <ul class="home_tab">
        <li class="btn" @click="change('主页')"><i class="el-icon-school"></i>首页</li>
        <li class="btn" @click="change('预约')"><i class="el-icon-coordinate"></i>预约</li>
        <li class="btn" @click="change('挂号')"><i class="el-icon-user"></i>挂号</li>
        <li class="btn" @click="change('费用支付')"><i class="el-icon-s-custom"></i>费用支付</li>

      </ul>
      <div></div>
    </div>

    <div style="margin: 1rem auto; display: flex;gap:2rem">
      <div class="patienthome_left" >
        <div style="text-align: center">
          <img src="https://i03piccdn.sogoucdn.com/dc8a5a1e5b364703" style="width: 6rem;height: 6rem;">
        </div>
        <div class="key">姓名</div>
        <div class="value">{{ patientObject[0].name }}</div>
        <div class="key">证件号</div>
        <div class="value">{{ patientObject[0].id_card }}</div>
        <div class="key">联系方式</div>
        <div class="value">{{ patientObject[0].tel }}</div>
        <div style="text-align: center;margin: 2rem 0">
          <el-button type="danger" @click="LogOut">退出登陆</el-button>
        </div>
      </div>
      <div class="patienthome_right">
        <div :style="{'display': activeName==='主页'? 'block': 'none'}">主页！！！！！！</div>
        <div @click="activeName='预约'" :style="{'display': activeName==='预约'? 'block': 'none'}">
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
        </div>

        <div @click="activeName='挂号'" :style="{'display': activeName==='挂号'? 'block': 'none'}">
          <el-form ref="form" :model="PatientConsultation" label-width="160px">
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
        </div>
        <div @click="activeName='费用支付'" :style="{'display': activeName==='费用支付'? 'block': 'none'}">
          <el-button type="primary">支付</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      Dept:[
        {
          dept_name: '',
          price:''
        }
      ],
      patient_id: '',
      activeName: '主页',
      reservationtotal: '',
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
      this.patient_id = response.data.data.id
      this.$axios.get('/reservation/query').then(response => {      //返回值部分
        this.reservation = response.data.data
        console.log(this.reservation)
        this.reservationtotal = response.data.data.length
        this.reservation.forEach(item => {
          if (item.status === 0) {
            item.status="不可预约"
          } else if (item.status === 1) {
            item.status="可预约"
          }
        })
      }).catch(error => {
        console.log(error)
      })

      this.$axios.post('/patient/queryById', this.$qs.stringify({
        id: this.patient_id
      })).then(response => {      //返回值部分
        this.patientObject = response.data.data
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })

    this.$axios.get('/dept/query').then(response => {      //返回值部分
      this.Dept = response.data.data
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
    resehandleEdit(index) {
      this.PatientConsultation.patientName = this.patientObject[0].name
      this.PatientConsultation.patientId = this.patient_id
      this.PatientConsultation.type = "门诊"
      this.PatientConsultation.doctorName = this.reservation[index].doctor.doctor_name
      console.log(this.reservation[index].doctor.doctor_id)
      this.PatientConsultation.doctorId = this.reservation[index].doctor.doctor_id
      this.PatientConsultation.deptName = this.reservation[index].dept.dept_name
      this.PatientConsultation.deptId = this.reservation[index].dept.dept_id
      this.PatientConsultation.con_num = Math.floor((new Date().getTime() % 1000) + 1)
      this.PatientConsultation.money = this.Dept.find(item => item.dept_name===this.PatientConsultation.deptName).price
      this.activeName = "挂号"
    },
    addPatientConsultation() {
      this.$axios.post('/consultation/add', this.PatientConsultation).then(response => {
        console.log(response.data)
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