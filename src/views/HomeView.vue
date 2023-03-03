<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.png" class="logo" />
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <span class="quit-login" @click="logout">退出登录</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside >
          <el-col :span="12">
             <!--router 启用该模式会在激活导航时以 index 作为 path 进行路由跳转  -->
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
              :default-active="activePath" text-color="#fff"
              router
              >
              <el-menu-item :index="item.path" v-for="(item,i) in menuList" :key="i"  >
                <span>{{item.meta.title}}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  setup(){
    const router = useRouter()
    console.log(router.getRoutes())
    const menuList = router.getRoutes().filter(item => item.meta.isShow == true)
    console.log(menuList)

    const route = useRoute()
    const activePath = route.path  

    const logout = ()=>{
      localStorage.removeItem('token')
      router.push('/login')
    }
    // const activePath = localStorage.getItem('activePath') || '/goods'
    // console.log(activePath)
    // const saveActivePath = (activePath:string)=>{
    //   console.log(activePath)

    //   localStorage.setItem('activePath', activePath)
    // }

    return {
      menuList,
      // saveActivePath,
      activePath,
      logout
    }
  },
  components: {

  },
});
</script>

<style lang="scss">
.el-header {
  height: 80px;
  background-color: #666;

  .logo {
    height: 80px;
  }

  h2,
  .quit-login {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
    cursor: pointer;
  }
}
.el-aside{
   width:350px;
  .el-menu{
    height: calc(100vh - 80px);
    width: 100%;
  }
}
</style>