<template>
<div class="container">
  <div class="content">
    <router-view> </router-view>
  </div>
  <div class="side-bar">
    <div class="user">
      <h1>欢迎{{id}}</h1>
      <a href="#/login">登出</a>
    </div>
    <div class="nav">
      <ul>
        <router-link :to="`/admin/allStaff`" > <li :class="selected==1?'selected':''" @click="select(1)">所有员工列表</li></router-link>
        <router-link to="/admin/planList"><li :class="selected==2?'selected':''" @click="select(2)">培训计划列表</li></router-link>
        <router-link to="`/admin/userInfo`" ><li :class="selected==3?'selected':''" @click="select(3)">修改个人资料</li></router-link>
      </ul>
    </div>
  </div>


</div>
</template>

<script>
  import AllStaff from '../components/AllStaff'
  import PlanList from '../components/PlanList'
  import axios from 'axios'

  export default {
    created(){//this.id = this.$route.params.id;
      this.getUserInfo(id);
      this.$router.push('admin/welcome')
    },
    data(){
      return{
        view:'',
        selected:null,
        id:this.$route.params.id,
        userInfo:{},
      }
    }
    ,
      name: "admin",
      components:{
        AllStaff,
        PlanList
      },
      methods:{
      getUserInfo(id){
        axios({
          method: 'get',
          url: `api/user/${id}`
        }).then(result => {
          console.log(result.data);
          this.userInfo = result.data;
        })
      },
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
