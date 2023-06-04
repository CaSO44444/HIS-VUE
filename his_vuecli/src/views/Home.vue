<template>
  <div class="home">
      <div class="tile_list">
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="医院简介" name="first">
                  <div class="outline-image">
                      <el-image src="" fit="contain"></el-image>
                      <el-image src="" fit="contain"></el-image>
                  </div>
              </el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
      </div>

        <div class="home_title">
            <div class="home_img">
                <img src="../assets/Choose/HOME1.png" alt="" width="300px">
            </div>
          <div class="home_inf">
              <span>欢迎光临HIS 选择您的身份</span>
          </div>
            <div class="home_button">
                <el-button type="danger" round @click="gopatientlogin">我是患者</el-button>
                <el-button type="danger" round @click="godoctorlogin">我是医生</el-button>
            </div>
        </div>

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {},
    data() {
        return {
            activeName: 'second'
        };
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        godoctorlogin(){
            this.$router.push('/DoctorLogin')
        },
        gopatientlogin(){
            this.$router.push('/PatientLogin')
        }
    }
}
</script>
<style>
    .home{
        width: 1500px;
        height: 800px;
        position: relative;
    }
    .home_title{
        position: absolute;
        top: 50px;
        left: 50%;
    }
    .home_inf{
        font-size: 30px;
        position: absolute;
        top: 300px;
        width: 400px;
        font-family: "HoloLens MDL2 Assets";

    }
    .home_button{
        position: absolute;
        left: 40px;
        top: 400px;
    }
    .tile_list{
        position: absolute;;
        left: 50px;
        top: 20px;
    }
    .outline-image {
        width: 300px; /* 设置轮廓图容器的宽度 */
        height: 300px; /* 设置轮廓图容器的高度 */
        display: flex; /* 设置轮廓图容器为弹性盒子 */
        justify-content: space-between; /* 图片之间的间距 */
    }
</style>