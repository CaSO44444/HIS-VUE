<template>
  <div class="doctorhome">

    <div style="display: flex; justify-content: space-between; line-height: 3rem; padding:1rem 0;">
      <div class="home_top">
        <div><img class="home_img" src="../assets/Choose/HOME1.png"></div>
        <div style="vertical-align: middle;">阳光医疗管理系统</div>
      </div>
      <ul class="home_tab">
        <li class="btn" @click="change(0)">首页</li>
        <li class="btn" @click="change(1)">患者信息及病历</li>
        <li class="btn" @click="change(2)">患者跟进</li>
        <li class="btn" @click="change(3)">药品管理</li>
        <li class="btn" @click="change(4)">药品分类</li>

      </ul>
      <el-button type="danger" @click="LogOut">退出登陆</el-button>
    </div>
    <div style="display: flex;gap:2rem">
      <!--        侧边栏  显示所有桓泽和的挂号信息-->
      <div class="doctorhome_left">
        <!--            采用卡片模式-->
        <!--            搜索，日期转换，根据日期选择挂号  + 根据患者姓名搜索患者信息
                          姓名为空默认搜索 所有 日期为空默认搜索今天 -->
        <div class="doctorhome_lect_form">
          <el-form :inline="true" :model="this.doctorhomeform" class="demo-form-inline" size="mini">
            <el-form-item label="检查时间">
              <el-col :span="11">
                <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期" v-model="doctorhomeform.date" style="width: 130px"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        未诊患者
        <div class="doctorhome_lect_no">
          <el-table
              border
              stripe
              :data="noform"
              style="width: 100%"
              size="mini"
              :cell-style="{ padding: '1px 0' }"
              height="200"
          >
            <el-table-column prop="consultation_id" label="挂号id" width="120"></el-table-column>
            <el-table-column prop="patient.name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="" label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="success" size="small" round @click="bosschange(scope.row.patient.name)">
                  选择
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="tablePage.pageNum"
                :page-size="tablePage.pageSize"
                :page-sizes="pageSizes"
                :total="noformtotal"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
            />
          </div>
        </div>
        <!--                已疹患者-->
        <div class="doctorhome_lect_yes">
          已诊患者
          <el-table
              border
              stripe
              :data="form"
              style="width: 100%"
              :cell-style="{padding:'1px 0'}"

          >
            <el-table-column
                prop="consultation_id"
                label="挂号id"
                width="120"

            />
            <el-table-column
                prop="patient.name"
                label="姓名"
                width="120"
            />

            <el-table-column
                prop=""
                label="操作"
                width="180">
              <template slot-scope="scope">
                <el-button type="success" size="small" round @click="bosschange(scope.row.patient.name)">选择
                </el-button>
                <!--                                                         获取索引-->
                <!--                         {{scope.$index}}-->
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="tablePage.pageNum"
                :page-size="tablePage.pageSize"
                :page-sizes="pageSizes"
                :total="formtotal"
                @size-change="formhandleSizeChange"
                @current-change="formhandlePageChange"
            />
          </div>
        </div>
      </div>
      <div class="doctorhome_right">

        <div :style="{'display': activeName===0? 'block': 'none'}">主页！！！！！！</div>
        <div :style="{'display': activeName===1? 'block': 'none'}">
          <div class="doctorhome_right_tabs_patientinf_form">
            <el-form ref="thisPagePatientPRRandMR" :model="thisPagePatientPRRandMR" label-width="80px"
                     style="    display: flex;flex-wrap: wrap;flex-direction: column;height:20rem;">
              <!--类型-->
              <el-form-item label="类型">
                <el-input
                    label="类型"
                    type="textarea"
                    :rows="1"
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.type">
                </el-input>
              </el-form-item>
              <el-form-item label="门诊编号">
                <el-input
                    label="门诊编号"
                    type="textarea"
                    :rows="1"
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.con_num">
                </el-input>
              </el-form-item>
              <el-form-item label="会诊科室">
                <el-input
                    label="会诊科室"
                    type="textarea"
                    :rows="1"
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.dept.dept_name">
                </el-input>
              </el-form-item>
              <el-form-item label="诊疗费用">
                <el-input
                    label="费用"
                    type="textarea"
                    :rows="1"
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.money">
                </el-input>
              </el-form-item>
              <el-form-item label="诊疗药品">
                <el-input
                    label="药品"
                    type="textarea"
                    :rows="1"
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.medicine.medicine_name">
                </el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.patient.name"
                    :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.patient.gender"
                    :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.patient.age"
                    :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="挂号时间">
                <el-input
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.time"
                    :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="支付否">
                <el-input
                    placeholder="请输入内容"
                    v-model="thisPagePatientPRRandMR.pay"
                    :disabled="true">
                </el-input>
              </el-form-item>

            </el-form>
            <div>
              <!--                                把左侧主诉，现病史，诊断结果等提交-->
              <el-button type="primary" @click="updateLook">提交信息</el-button>
              <el-button type="success" @click="beginLook">开始就诊</el-button>
            </div>
          </div>
        </div>
        <div :style="{'display': activeName===2? 'block': 'none'}">
          <div id="app">
            <el-table border max-height="600px" :data="PatientFollow" class="tb-edit" style="width: 100%"
                      highlight-current-row>
              <el-table-column prop="id" label="id" width="180">
              </el-table-column>
              <el-table-column prop="type" label="方法" width="180">
              </el-table-column>
              <el-table-column prop="title" label="标题" width="180">
              </el-table-column>
              <el-table-column label="患者姓名" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drid" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.patient.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="负责医生" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drformat" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.patient.doctor.doctor_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="跟进时间">
                <template scope="scope">
                  <span>{{ scope.row.follow_date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="下次跟进时间">
                <template scope="scope">
                  <span>{{ scope.row.next_follow }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template scope="scope">
                  <span>{{ scope.row.status }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template scope="scope">
                  <el-button size="small" @click="phandleEdit(scope.$index)">编辑</el-button>
                  <el-button size="small" type="danger" @click="phandleDelete(scope.$index,scope.row.id)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div :style="{'display': activeName===3? 'block': 'none'}">
          <div id="app">
            <el-table border max-height="600px" :data="tableDataDrug" class="tb-edit" style="width: 100%"
                      highlight-current-row>
              <el-table-column prop="medicine_id" label="id" width="180">
              </el-table-column>
              <el-table-column prop="medicine_name" label="药品名称" width="180">
              </el-table-column>

              <el-table-column label="类型" width="180">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drid" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.medicineType.type_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="药品编号" width="180">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drformat" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.medicine_card }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单价" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drconsumption" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="库存数量" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drtype" placeholder="请输入内容" ></el-input> -->
                  <span>{{ scope.row.medicine_num }}</span>
                </template>
              </el-table-column>
              <el-table-column label="供应商" width="180">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drmoney" placeholder="请输入内容" ></el-input> -->
                  <span>{{ scope.row.vendor.vendor_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template scope="scope">
                  <el-button size="small" @click="handleEdit(scope.$index)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row.medicine_id)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div :style="{'display': activeName===4? 'block': 'none'}">
          <div id="app">
            <el-dropdown>
              <el-button type="primary">
                药品类型<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateSelectedType('处方药')">处方药</el-dropdown-item>
                <el-dropdown-item @click.native="updateSelectedType('非处方药')">非处方药</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <br>
            <el-table v-if="selectedType === '处方药'" :data="prescriptionDrugs" class="tb-edit" style="width: 100%"
                      highlight-current-row>

              <el-table-column prop="medicine_name" label="药品名称" width="180">
              </el-table-column>
              <el-table-column label="药品编号" width="180">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drformat" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.medicine_card }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单价" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drconsumption" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="库存数量" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drtype" placeholder="请输入内容" ></el-input> -->
                  <span>{{ scope.row.medicine_num }}</span>
                </template>
              </el-table-column>

              <el-table-column label="供应商" width="180">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drmoney" placeholder="请输入内容" ></el-input> -->
                  <span>{{ scope.row.vendor.vendor_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template scope="scope">
                  <el-button size="small" @click="preDrugshandleEdit(scope.$index)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row.medicine_id)">删除
                  </el-button>
                </template>
              </el-table-column>

            </el-table>

            <el-table v-if="selectedType === '非处方药'" :data="nonPrescriptionDrugs" border>

              <el-table-column prop="medicine_name" label="药品名称" width="180">
              </el-table-column>
              <el-table-column label="药品编号" width="180">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drformat" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.medicine_card }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单价" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drconsumption" placeholder="请输入内容" ></el-input>-->
                  <span>{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="库存数量" width="90">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drtype" placeholder="请输入内容" ></el-input> -->
                  <span>{{ scope.row.medicine_num }}</span>
                </template>
              </el-table-column>

              <el-table-column label="供应商" width="180">
                <template scope="scope">
                  <!--                                    <el-input size="small" v-model="scope.row.drmoney" placeholder="请输入内容" ></el-input> -->
                  <span>{{ scope.row.vendor.vendor_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template scope="scope">
                  <el-button size="small" @click="nonPreDrugshandleEdit(scope.$index)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row.medicine_id)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddMedicine from "@/views/AddMedicine.vue";
import AddFollow from "@/views/AddFollow.vue";
import AddDrugs from "@/views/AddDrugs.vue";

export default {
  data() {
    return {
      tablePage: {
        pageNum: 1, // 第几页
        pageSize: 4, // 每页多少条,
        total: 0
      },
      pageSizes: [4, 10, 20, 30],
      selectedType: '',
      prescriptionDrugs: [], // 处方药数据
      nonPrescriptionDrugs: [], // 非处方药数据
      pay: 0,
      //就诊总数
      formtotal: 0,
      //未就诊总数
      noformtotal: 0,
      formpageNo: 1,
      activeName: 0,
      docker_id: '',
      doctorhomeform: {
        username: '',
        date: ''
      },
      //没就诊的患者
      noform: [
        {
          bed_num: '',
          con_num: '',
          consultation_id: '',
          dept: {
            dept_id: '',
            dept_name: ''
          },
          medicine: {
            medicine_id: '',
            medicine_name: '',
            medicine_num: '',
            status: ''
          },
          money: '',
          patient: {
            age: '',
            doctor: {
              doctor_id: '',
              doctor_name: ''
            },
            follow: '',
            gender: '',
            id: '',
            name: '',
            status: ''
          },
          pay: '',
          status: '',
          time: '',
          type: ''
        }
      ],
      form: [
        {
          bed_num: '',
          con_num: '',
          consultation_id: '',
          dept: {
            dept_id: '',
            dept_name: ''
          },
          medicine: {
            medicine_id: '',
            medicine_name: '',
            medicine_num: '',
            status: ''
          },
          money: '',
          patient: {
            age: '',
            doctor: {
              doctor_id: '',
              doctor_name: ''
            },
            follow: '',
            gender: '',
            id: '',
            name: '',
            status: ''
          },
          pay: '',
          status: '',
          time: '',
          type: ''
        }
      ],
      //选中患者的名字
      thisPagePatientname: '',
      //患者挂号，病例信息
      thisPagePatientPRRandMR:
          {
            bed_num: '',
            con_num: '',
            consultation_id: '',
            dept: {
              dept_id: '',
              dept_name: ''
            },
            medicine: {
              medicine_id: '',
              medicine_name: '',
              medicine_num: '',
              status: ''
            },
            money: '',
            patient: {
              age: '',
              doctor: {
                doctor_id: '',
                doctor_name: ''
              },
              follow: '',
              gender: '',
              id: '',
              name: '',
              status: ''
            },
            pay: '',
            status: '',
            time: '',
            type: ''
          },
      tableDataDrug: [
        {
          medicineType: {
            type_id: '',
            type_name: ''
          },
          medicine_card: '',
          medicine_id: '',
          medicine_name: '',
          medicine_num: '',
          model: '',
          price: '',
          status: '',
          unit: '',
          vendor: {
            manager: {
              manager_id: '',
              manager_name: ''
            },
            num: '',
            status: '',
            vendor_id: '',
            vendor_name: ''
          }
        }
      ],
      PatientFollow: [
        {
          follow_date: '',
          id: '',
          next_follow: '',
          patient: {
            age: '',
            doctor: {
              doctor_id: '',
              doctor_name: ''
            },
            follow: '',
            gender: '',
            id: '',
            name: '',
            status: ''
          },
          status: '',
          title: '',
          type: ''
        }
      ],
    }
  },

  components: {
    AddMedicine,
    AddFollow
  },
  created() {
    this.$axios.get('/checkToken').then(response => {
      this.docker_id = response.data.data.id
      this.$axios.post('follow/find',
          this.$qs.stringify(
              {
                id: this.docker_id,
              }
          )
      ).then(response => {      //返回值部分
        this.PatientFollow = response.data.data
      }).catch(error => {
        console.log(error)
      })

      this.$axios.post('consultation/selectBydoctorId',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 0,
              }
          )
      ).then(response => {      //返回值部分
        this.noformtotal = response.data.data.length
      }).catch(error => {
        console.log(error)
      })

      this.$axios.post('consultation/selectBydoctorId',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 1
              }
          )
      ).then(response => {      //返回值部分
        this.formtotal = response.data.data.length
      }).catch(error => {
        console.log(error)
      })

      this.$axios.post('consultation/selectBydoctorIdLim',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 1,
                pageSize: this.tablePage.pageSize,
                pageNum: this.tablePage.pageNum
              }
          )
      ).then(response => {      //返回值部分
        this.form = response.data.data
      }).catch(error => {
        console.log(error)
      })

      this.$axios.post('consultation/selectBydoctorIdLim',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 0,
                pageSize: this.tablePage.pageSize,
                pageNum: this.tablePage.pageNum
              }
          )
      ).then(response => {      //返回值部分
        this.noform = response.data.data
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })

    this.$axios.get('medicine/queryall',
    ).then(response => {
      //返回值部分
      console.log(response.data.data)
      this.tableDataDrug = response.data.data;
      this.tableDataDrug.forEach(item => {
        if (item.medicineType.type_name === '处方药') {
          this.prescriptionDrugs.push(item);
        } else if (item.medicineType.type_name === '非处方药') {
          this.nonPrescriptionDrugs.push(item);
        }
      });
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    change(i) {
      this.activeName = i;
    },
    LogOut() {
      function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }

      deleteCookie("token")

      this.$router.push("/")
    },
    handlePageChange(currentPage) {
      this.tablePage.pageNum = currentPage
      this.$axios.post('consultation/selectBydoctorIdLim',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 0,
                pageSize: this.tablePage.pageSize,
                pageNum: this.tablePage.pageNum
              }
          )
      ).then(response => {
        //返回值部分
        this.noform = response.data.data
      }).catch(error => {
        console.log(error)
      })
      // 在此刷新数据
    },
    formhandlePageChange(currentPage) {
      this.$axios.post('consultation/selectBydoctorIdLim',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 1,
                pageSize: this.tablePage.pageSize,
                pageNum: this.tablePage.pageNum
              }
          )
      ).then(response => {      //返回值部分
        this.form = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize
      this.$axios.post('consultation/selectBydoctorIdLim',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 0,
                pageSize: this.tablePage.pageSize,
                pageNum: this.tablePage.pageNum
              }
          )
      ).then(response => {      //返回值部分
        this.noform = response.data.data
      }).catch(error => {
        console.log(error)
      })
      // 在此刷新数据
    },
    formhandleSizeChange(pageSize) {
      this.$axios.post('consultation/selectBydoctorIdLim',
          this.$qs.stringify(
              {
                id: this.docker_id,
                status: 1,
                pageSize: this.tablePage.pageSize,
                pageNum: this.tablePage.pageNum
              }
          )
      ).then(response => {      //返回值部分
        this.form = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    updateSelectedType(type) {
      this.selectedType = type;
      console.log(this.selectedType);
    },
    preDrugshandleEdit(id) {
      this.flag = true;
      if (this.flag) {
        this.$layer.iframe({
          type: 2,
          title: "添加",
          area: ['800px', '500px'],
          shade: true,
          offset: 'auto',
          content: {
            content: AddDrugs,//传递的组件主线
            parent: this,
            data: {
              prescriptionDrugs: this.prescriptionDrugs[id]
            }
          }
        })
      }
    },
    nonPreDrugshandleEdit(id) {
      this.flag = true;
      if (this.flag) {
        this.$layer.iframe({
          type: 2,
          title: "添加",
          area: ['800px', '500px'],
          shade: true,
          offset: 'auto',
          content: {
            content: AddDrugs,//传递的组件主线
            parent: this,
            data: {
              prescriptionDrugs: this.nonPrescriptionDrugs[id]
            }
          }
        })
      }
    },
    handleEdit(id) {
      this.flag = true;
      if (this.flag) {
        this.$layer.iframe({
          type: 2,
          title: "添加",
          area: ['800px', '500px'],
          shade: true,
          offset: 'auto',
          content: {
            content: AddMedicine,//传递的组件主线
            parent: this,
            data: {
              tableDataDrug: this.tableDataDrug[id]
            }
          }
        })
      }
    },
    phandleEdit(id) {
      this.flag = true;
      if (this.flag) {
        this.$layer.iframe({
          type: 2,
          title: "添加",
          area: ['800px', '500px'],
          shade: true,
          offset: 'auto',
          content: {
            content: AddFollow,//传递的组件主线
            parent: this,
            data: {
              PatientFollow: this.PatientFollow[id]
            }
          }
        })
      }
    },
    bosschange(puname) {
      this.thisPagePatientname = puname
      //返回患者病例 挂号信息
      this.$axios.post('consultation/selectByPatientName',
          this.$qs.stringify(
              {
                patient_name: puname
              }
          )
      ).then(response => {
        //返回值部分
        this.thisPagePatientPRRandMR = response.data.data[0]
        console.log(this.thisPagePatientPRRandMR)
        if (this.thisPagePatientPRRandMR.patient.gender === '1') {
          this.thisPagePatientPRRandMR.patient.gender = '男'
        } else {
          this.thisPagePatientPRRandMR.patient.gender = '女'
        }

        if (this.thisPagePatientPRRandMR.pay === 1) {
          this.thisPagePatientPRRandMR.pay = '已支付'
        } else {
          this.thisPagePatientPRRandMR.pay = '未支付'
        }

      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit() {
      //未就诊
      this.$axios.post('/consultation/selectBydate',
          this.$qs.stringify(
              {
                date: this.doctorhomeform.date,
                docker_id: this.docker_id,
                status: 0,
                pageNo: 1
              }
          )
      ).then(response => {      //返回值部分
        this.noform = response.data.data
        this.noformtotal = response.data.data.length
      }).catch(error => {
        console.log(error)
      })
      //就诊
      this.$axios.post('/consultation/selectBydate',
          this.$qs.stringify(
              {
                date: this.doctorhomeform.date,
                docker_id: this.docker_id,
                status: 1,
                pageNo: 1

              }
          )
      ).then(response => {      //返回值部分
        this.form = response.data.data
        this.formtotal = response.data.data.length

      }).catch(error => {
        console.log(error)
      })
    },
    updateLook() {
      if (
          this.thisPagePatientPRRandMR.status === 0
      ) {
        this.$alert('', '提交信息失败！此患者未开始就诊，无法提交信息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `no`
            });
          }
        });
      } else {
        //提交到后台
        if (this.thisPagePatientPRRandMR.pay === "未支付") {
          this.pay = 0
        }
        this.$axios.post('/consultation/update',
            {
              consultation_id: this.thisPagePatientPRRandMR.consultation_id,
              type: this.thisPagePatientPRRandMR.type,
              con_num: this.thisPagePatientPRRandMR.con_num,
              patientId: this.thisPagePatientPRRandMR.patient.id,
              deptId: this.thisPagePatientPRRandMR.dept.dept_id,
              bed_num: this.thisPagePatientPRRandMR.bed_num,
              doctorId: this.docker_id,
              money: this.thisPagePatientPRRandMR.money,
              time: this.thisPagePatientPRRandMR.time,
              medicineId: this.thisPagePatientPRRandMR.medicine.medicine_id,
              pay: this.pay,
              status: 1
            }
        ).then(response => {      //返回值部分
          this.$alert('', '提交信息成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `yes`
              });
            }
          });
        }).catch(error => {
          console.log(error)
        })
      }
    },
    beginLook() {
      if (this.thisPagePatientPRRandMR.status === 1) {
        this.$alert('', '开始就诊失败！此患者已就诊', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `no`
            });
          }
        });
      } else {
        //设置看诊否为看诊
        //传递到后台
        this.$axios.post('/consultation/update_status',
            {
              consultation_id: this.thisPagePatientPRRandMR.consultation_id,
              type: this.thisPagePatientPRRandMR.type,
              con_num: this.thisPagePatientPRRandMR.con_num,
              patientId: this.thisPagePatientPRRandMR.patient.id,
              deptId: this.thisPagePatientPRRandMR.dept.dept_id,
              bed_num: this.thisPagePatientPRRandMR.bed_num,
              doctorId: this.docker_id,
              money: this.thisPagePatientPRRandMR.money,
              time: this.thisPagePatientPRRandMR.time,
              medicineId: this.thisPagePatientPRRandMR.medicine.medicine_id,
              pay: this.pay,
              status: 1
            }
        ).then(response => {
          this.$alert('', '提交成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `success`
              });
            }
          })
          this.thisPagePatientPRRandMR.status = 1   //返回值部分
        }).catch(error => {
          console.log(error)
        })
        //设置左侧模块把患者从未就诊模块移动到已经就诊模块
        //未就诊
        this.$axios.post('/consultation/selectBydate',
            this.$qs.stringify(
                {
                  date: this.doctorhomeform.date,
                  docker_id: this.docker_id,
                  status: 0,
                  pageNo: 1
                }
            )
        ).then(response => {      //返回值部分
          this.noform = response.data.data
        }).catch(error => {
          console.log(error)
        })
        //就诊
        this.$axios.post('/consultation/selectBydate',
            this.$qs.stringify(
                {
                  date: this.doctorhomeform.date,
                  docker_id: this.docker_id,
                  status: 1,
                  pageNo: 1
                }
            )
        ).then(response => {      //返回值部分
          this.form = response.data.data
        }).catch(error => {
          console.log(error)
        })
      }
    },
    //删除药品
    handleDelete(index, id) {
      console.log(index)
      this.$axios.get('/medicine/deleteById?id=' + id)
      this.tableDataDrug.splice(index, 1)
    },
    phandleDelete(index, id) {
      console.log(index)
      this.$axios.get('/follow/deleteById?id=' + id)
      this.tableDataDrug.splice(index, 1)
    },
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


.doctorhome {
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

.doctorhome_left {
  width: 500px;
  padding: 1rem 2rem;
  border-right: 1px solid gray;
  height: calc(100vh - 7rem);
}

.doctorhome_lect_no {
  /*background-color: #42b983;*/
  height: 300px;
  border-top: 1px solid black;
}

.doctorhome_lect_yes {
  /*background-color: #2b8ea7;*/
  height: 300px;
  border-top: 1px solid black;
}

.doctorhome_right {

}

.doctorhome_right_tabs {
  width: 100%;
  height: 100%;
}

.doctorhome_right_tabs_patientinf_form {

  width: 400px;

}

.doctorhome_right_tabs_patientinf_form_r {

}

.doctorhome_right_tabs_patientinf_diagnosisform {
  position: absolute;
  top: 400px;
  left: 435px;
}

.doctorhome_right_tabs_third_iimultipleTable {
  position: absolute;
  top: 264px;
  left: 350px;
}

.doctorhome_right_tabs_fourth_iitiend {
  width: 1000px;
  height: 700px;
}

.doctorhome_fourth_form1 {
  position: absolute;
  left: 0px;
  top: 260px;


}

.box-card_form1 {
  height: 370px;

  width: 600px;
}

.doctorhome_fourth_form1_other {
  position: absolute;
  left: 630px;
  top: 260px;
  width: 350px;
}

.doctorhome_fourth_form1_other_refresh {
  margin-top: 20px;
  position: relative;
  left: 140px;
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

.el-dropdown {
  vertical-align: top;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>