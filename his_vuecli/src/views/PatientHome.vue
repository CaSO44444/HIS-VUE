<template>
  <div class="patienthome">
    <div class="patienthome_right">
      <el-tabs v-model="activeName" type="card" class="doctorhome_right_tabs">
        <el-tab-pane label="首页" name="first">主页！！！！！！</el-tab-pane>
        <el-tab-pane label="挂号预约" name="second">

        </el-tab-pane>
        <el-tab-pane label="费用支付" name="third"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName:"first"
    }
  },
  components: {
  },
  created() {

  },
  methods:{

  }
}
</script>
<style>

.patienthome_right{
  position: absolute;
  left: 500px;
  /*z-index: 9999;*/
  right: 10px;
  height: 100%;
}
.patientrhome_right_tabs{
  width: 100%;
  height: 100%;
}
.patienthome_right_tabs_patientinf_form{

  width: 400px;

}
.patienthome_right_tabs_patientinf_form_r{
  position: absolute;
  width: 400px;
  height: 600px;
  /*background-color: #42b983;*/
  left: 450px;
  top: 0px;
}
.doctorhome_right_tabs_patientinf_diagnosisform{
  position: absolute;
  top: 400px;
  left: 435px;
}
.doctorhome_right_tabs_third_iimultipleTable{
  position: absolute;
  top: 264px;
  left: 350px;
}
.doctorhome_right_tabs_fourth_iitiend{
  width: 1000px;
  height: 700px;
}
.doctorhome_fourth_form1{
  position: absolute;
  left: 0px;
  top: 260px;


}
.box-card_form1{
  height: 370px;

  width: 600px;
}
.doctorhome_fourth_form1_other{
  position: absolute;
  left: 630px;
  top: 260px;
  width: 350px;
}
.doctorhome_fourth_form1_other_refresh{
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
.tb-edit .current-row .el-input+span {
  display: none
}

.tb-edit .el-select {
  display: none
}
.tb-edit .current-row .el-select {
  display: block
}
.tb-edit .current-row .el-select+span {
  display: none
}
/*    表格可操作核心部分 非药品处理*/

.tb-edit2 .el-input {
  display: none
}
.tb-edit2 .current-row .el-input {
  display: block
}
.tb-edit2 .current-row .el-input+span {
  display: none
}

.tb-edit2 .el-select {
  display: none
}
.tb-edit2 .current-row .el-select {
  display: block
}
.tb-edit2 .current-row .el-select+span {
  display: none
}


</style>