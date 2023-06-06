<template>
  <div class="addMedicine">
    <el-form ref="form" :model="prescriptionDrugs" label-width="160px">
      <el-col :span="12">
        <el-form-item label="药品名">
          <el-input v-model="prescriptionDrugs.medicine_name" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="药品类型">
          <el-select v-model="prescriptionDrugs.medicineType.type_name" @change="$forceUpdate()" placeholder="请选择药品种类">
            <el-option label="处方药" value="处方药"></el-option>
            <el-option label="非处方药" value="非处方药"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="药品编号">
          <el-input v-model="prescriptionDrugs.medicine_card" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="单价">
          <el-input v-model="prescriptionDrugs.price" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="库存数量">
          <el-input v-model="prescriptionDrugs.medicine_num" @input="$forceUpdate()"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="管理者">
          <el-select v-model="prescriptionDrugs.vendor.manager.manager_name" @change="$forceUpdate()" placeholder="请选择管理者">
            <el-option
                v-for="item in manager"
                :key="item.manager_name"
                :label="item.manager_name"
                :value="item.manager_name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="供应商">
          <el-select v-model="prescriptionDrugs.vendor.vendor_name" @change="$forceUpdate()" placeholder="请选择供应商">
            <el-option
                v-for="item in vendor"
                :key="item.vendor_name"
                :label="item.vendor_name"
                :value="item.vendor_name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-button type="primary" @click="addpreDrugs">提交信息</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      manager:[
        {
          manager_id: '',
          manager_name: ''
        }
      ],
      vendor:[
        {
          address: '',
          doctor: {
            doctor_id: '',
            doctor_name: ''
          },
          level: '',
          manager: {
            manager_id:'',
            manager_name: ''
          },
          num: '',
          province: '',
          status: '',
          type: '',
          vendor_id: '',
          vendor_name: ''
        }
      ],
    }
  },
  name: 'adddrugs',
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
    prescriptionDrugs: {
      type: Object,
    },
  },
  created() {
    this.$axios.get('/manager/query'
    ).then(response => {      //返回值部分
      this.manager = response.data.data;
    }).catch(error => {
      console.log(error)
    })

    this.$axios.get('/vendor/queryall'
    ).then(response => {      //返回值部分
      this.vendor = response.data.data;
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    // 添加功能函数
    addpreDrugs(e) {
      let newManage = {
        Medicine_id: this.prescriptionDrugs.medicine_id,
        medicineTypeId: this.prescriptionDrugs.medicineType.type_id,
        Medicine_name: this.prescriptionDrugs.medicine_name,
        medicine_card: this.prescriptionDrugs.medicine_card,
        model:this.prescriptionDrugs.model,
        price:this.prescriptionDrugs.price,
        medicine_num: this.prescriptionDrugs.medicine_num,
        unit:this.prescriptionDrugs.unit,
        managerId:this.prescriptionDrugs.vendor.manager.manager_id,
        vendorId:this.prescriptionDrugs.vendor.vendor_id
      };
      this.$axios.post("/medicine/edit",newManage
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

