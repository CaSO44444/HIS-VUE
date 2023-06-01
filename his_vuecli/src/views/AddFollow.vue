<template>
  <div class="addMedicine">
    <el-form ref="form" :model="PatientFollow" label-width="160px">
      <el-col :span="12">
        <el-form-item label="标题">
          <el-input v-model="PatientFollow.title" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="患者姓名">
          <el-input v-model="PatientFollow.patient.name" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="负责医生">
          <el-input v-model="PatientFollow.patient.doctor.doctor_name" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="跟进时间">
          <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期" v-model="PatientFollow.follow_date" @input="$forceUpdate()"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="下次跟进时间">
          <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期" v-model="PatientFollow.next_follow" @input="$forceUpdate()"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="状态">
          <el-input v-model="PatientFollow.status" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-button type="primary" @click="addFollow">提交信息</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  name: 'addfollow',
  // props中存储父组件中默认传过来的layerid和lydata值，用于在子组件中关闭父组件的弹框
  props: {
    layerid: {
      type: String,
      default: ""
    },
    lydata: {
      type: Object,
      default: () => {
        return {};
      }
    },
    PatientFollow: {
      type: Object,
    },
  },
  methods: {
    // 添加功能函数
    addFollow(e) {
      let newManage = {
        id: this.PatientFollow.id,
        type: this.PatientFollow.type,
        title: this.PatientFollow.title,
        patientId: this.PatientFollow.patient.id,
        doctorId:this.PatientFollow.patient.doctor.doctor_id,
        follow_date:this.PatientFollow.follow_date,
        next_follow: this.PatientFollow.next_follow,
        status:this.PatientFollow.status
      };
      this.$axios.post("/follow/edit",newManage
      ).then((close) =>{
        this.$layer.close(this.layerid);
        this.$layer.msg("修改成功");
      });
      e.preventDefault()
    }
  },

}
</script>


<style scoped>
.addMedicine {
  margin: 20px 20px  20px;
}
</style>

