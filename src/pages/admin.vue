<template>
<div class="container">
  <div class="content">
    <router-view> </router-view>
  </div>
  <div class="side-bar">
    <div class="user">
      <h1>欢迎{{userName}}</h1>
      <a href="#/login">登出</a>
    </div>
    <div class="nav">
      <ul>
        <router-link to="/admin/allStaff" > <li :class="selected==1?'selected':''" @click="select(1)">所有员工列表</li></router-link>
        <router-link to="/admin/planList"><li :class="selected==2?'selected':''" @click="select(2)">培训计划列表</li></router-link>
        <router-link :to="`/admin/userInfo/${userId}`"><li :class="selected==3?'selected':''" @click="select(3)">修改个人资料</li></router-link>
      </ul>
    </div>
  </div>


</div>
</template>

<script>

  export default {
    created(){
      this.$router.push('/admin/welcome')  //'/根目录开始 如果没有则从当前开始'
    },
    data(){
      return{
        view:'',
        selected:null,
        userId:this.$route.params.id,
        userName: this.$route.params.name,
      }
    }
    ,
      name: "admin",
      methods:{
      select(num){
        this.selected = num;
      },
      }
    }
</script>

<style lang="less">
  .container{
    width: 100%;
    height: 100%;
    margin:0;
    padding: 0;
    .side-bar {
      height: 1000px;
      width: 17%;
      background: #5BC0DE;
      color: white;
      ul{
        padding: 0;
      }
      .nav{
        margin-top: 50px ;
      }
      li{
        font-size: 15px;
        color: white;
        line-height: 50px;//让文字居中
        vertical-align: center;
        text-align: center;
        list-style: none;
        padding-left: 20px;
        background: #337AB7;
        height: 50px;
        width: 100%;
      }

      li:hover{
        background-color: #0e24b7;
      }
      .selected{
        background-color: #0e24b7;
      }
    }
  }

  .content{
    float: right;
    width: 81%;
    //margin-left: 50px;
  }

  .user h1{
    display: inline-block;
    margin-right: 50px;

  }
</style>
