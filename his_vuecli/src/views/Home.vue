<template>
  <div class="home">
    <div style="display: flex; justify-content: space-between; line-height: 3rem; padding:1rem 0;">
      <div class="home_top">
        <div><img class="home_img" src="../assets/Choose/HOME1.png"></div>
        <div style="vertical-align: middle;">阳光医疗管理系统</div>
      </div>
      <ul class="home_tab">
        <li class="btn" @click="gotonews"><i class="el-icon-school"></i>医院公告</li>
        <li class="btn" @click="gotodoctors"><i class="el-icon-coordinate"></i>医生介绍</li>
        <li class="btn" @click="gopatientlogin"><i class="el-icon-user"></i>患者登录</li>
        <li class="btn" @click="godoctorlogin"><i class="el-icon-s-custom"></i>医生登录</li>
      </ul>
      <div></div>
    </div>
    <div class="home_banner" @mouseover="clear_animation()" @mouseleave="animation()">
      <img :src="imgs[active_idx]">
      <div class="btn left" @click="active_idx=(active_idx+imgs.length-1)%imgs.length" style="left: 0;">&lt;</div>
      <div class="btn right" @click="active_idx=(active_idx+1)%imgs.length" style="right:0">&gt;</div>
      <div class="dot-list">
        <div style="display: flex;flex-direction: row;gap: 4px;">
          <div v-for="(_, i) in imgs" :class="['dot', {'active': i===active_idx}]" @click="change(i)"></div>
        </div>
      </div>
    </div>

    <div class="home_news">
      <i class="el-icon-bell" style="margin-right: 8px"></i>本院将更新系统，请立刻更新。
    </div>
    <div class="home_notification">
      <div
          style="display: flex;  justify-content: space-between; border-bottom: gray 1px solid; padding-bottom: 2px;">
        <div>公告</div>
        <div class="btn home_notification_more" @click="gotonews">更多 <span style="vertical-align: center">+</span></div>
      </div>

      <div class="home_notification_main">
        <div v-for="i in Array(4)" class="home_notification_item">
          <div class="home_notification_time">
            <div style="font-size: 1.6rem">06</div>
            <div style="font-size: 0.8rem">2023/04</div>
          </div>
          <div class="home_notification_info">
            四川"五老"宣讲团近3年宣讲3.68万场 今年开展四川"五老"宣讲团近3年宣讲3.68万场 今年开展...
          </div>
        </div>
      </div>

      <br><br><br>
      <div
          style="display: flex;  justify-content: space-between; border-bottom: gray 1px solid; padding-bottom: 2px;">
        <div>医生介绍</div>
        <div class="btn home_notification_more" @click="gotodoctors">更多 <span style="vertical-align: center">+</span></div>
      </div>
      <br>
      <div style="display: flex;flex-wrap: wrap; gap:50px;justify-content: center;" >
        <div v-for="_ in Array(3)" class="doctor_item">
          <img src="https://upload.cd5120.com/2019/0812/thumb_140_180_20190812031637259.jpg" alt="">
          <div style="text-align: center;font-weight: bold">周锐 <span
              style="margin-left: 6px;color: #1d8548;font-weight: normal">主任医生</span></div>
          <div style="text-align: center;color: #1d8548;font-weight: bold;padding: 6px 0;">肿瘤科</div>
          <div style="font-size: 0.8rem;padding:0 10% 10%;text-align: justify"><span style="font-weight: bold">擅长：</span>率先在我院开展肿瘤化疗、免疫治疗、肿瘤内分泌治疗，...</div>
        </div>
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
      imgs: ["https://oss.cd5120.com/20230605/092733457.jpg", "https://oss.cd5120.com/20230605/092825901.jpg", "https://oss.cd5120.com/20230605/092940303.jpg"],
      active_idx: 0,
      interval_id: null
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    godoctorlogin() {
      this.$router.push('/DoctorLogin')
    },
    gopatientlogin() {
      this.$router.push('/PatientLogin')
    },
    gotonews(){
      this.$router.push('/News')
    },
    gotodoctors(){
      this.$router.push('/Doctors')
    },
    change(i) {
      this.active_idx = i;
    },
    animation() {
      this.interval_id = setInterval(() => this.active_idx = (this.active_idx + 1) % this.imgs.length, 2000);
    },
    clear_animation() {
      clearInterval(this.interval_id);
    }
  },
  mounted() {
    this.animation();
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

.home {
  width: 80%;
  padding: 0 2rem;
    margin-left: auto;
    margin-right: auto;

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

.home_banner {
  width: 50%;
  height: 300px;
  margin: 0 auto;
  background-color: gray;
  position: relative;
}

.home_banner img {
  height: 300px;
  width: 100%;
  object-fit: cover;
}

.home_banner .left, .home_banner .right {
  position: absolute;
  top: 48%;
  background-color: gray;
  color: white;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 1.4rem;
  opacity: 70%;
  font-weight: 900;
  border: none !important;
}

.home_banner .dot-list {
  position: absolute;
  display: flex;

  padding: 8px;
  flex-direction: row-reverse;
  bottom: 0;
  left: 0;
  width: 100%;
}

.home_banner .dot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background-color: white;
}

.home_banner .dot.active {
  background-color: #42b983;
}

.home_news {
  width: 100%;
  padding: 0 1rem;
  margin: 16px auto;
  height: 3rem;
  line-height: 3rem;
  background-color: #faa755;
  color: white;
}

.home_notification_more {
  color: #1d8548;
  font-size: 0.9rem;
}

.home_notification_main {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px
}

.home_notification_item {
  width: 48%;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  align-items: center;
  flex: none;
}

.home_notification_time {
  width: 3.6rem;
  height: 3.6rem;
  border: #1d8548 1px solid;
  color: #1d8548;
  font-weight: 400;
  text-align: center;
  line-height: 1.8rem;
}

.doctor_item {
  display: flex;
  width: 20rem;
  border: #1d854880 1px solid;
  flex-direction: column;
}

.doctor_item img {
  width: 80%;
  margin: 1.5rem auto;
}

</style>