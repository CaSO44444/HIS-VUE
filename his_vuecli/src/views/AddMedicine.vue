<template>
  <div class="addMedicine">
    <el-form ref="form" :model="tableDataDrug" label-width="160px">
      <el-col :span="12">
      <el-form-item label="药品名">
        <el-input v-model="tableDataDrug.medicine_name" @input="$forceUpdate()"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="药品类型">
        <el-select v-model="tableDataDrug.medicineType.type_name" @change="$forceUpdate()" placeholder="请选择药品种类">
          <el-option label="处方药" value="处方药"></el-option>
          <el-option label="非处方药" value="非处方药"></el-option>
        </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="药品编号">
        <el-input v-model="tableDataDrug.medicine_card" @input="$forceUpdate()"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="单价">
        <el-input v-model="tableDataDrug.price" @input="$forceUpdate()"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="库存数量">
        <el-input v-model="tableDataDrug.medicine_num" @input="$forceUpdate()"></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="管理者">
      <el-select v-model="tableDataDrug.vendor.manager.manager_name" @change="$forceUpdate()" placeholder="请选择管理者">
        <el-option label="处方药" value="处方药"></el-option>
        <el-option label="非处方药" value="非处方药"></el-option>
      </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="供应商">
      <el-select v-model="tableDataDrug.vendor.vendor_name" @change="$forceUpdate()" placeholder="请选择供应商">
        <el-option label="处方药" value="处方药"></el-option>
        <el-option label="非处方药" value="非处方药"></el-option>
      </el-select>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item>
        <el-button type="primary" @click="addMedicine">提交信息</el-button>
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
  name: 'addmedicine',
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
    tableDataDrug: {
      type: Object,
    },
  },
  methods: {
    // 添加功能函数
    addMedicine(e) {
        let newManage = {
          Medicine_id: this.tableDataDrug.medicine_id,
          medicineTypeId: this.tableDataDrug.medicineType.type_id,
          Medicine_name: this.tableDataDrug.medicine_name,
          medicine_card: this.tableDataDrug.medicine_card,
          model:this.tableDataDrug.model,
          price:this.tableDataDrug.price,
          medicine_num: this.tableDataDrug.medicine_num,
          unit:this.tableDataDrug.unit,
          managerId:this.tableDataDrug.vendor.manager.manager_id,
          vendorId:this.tableDataDrug.vendor.vendor_id
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

