<template>
<div class="container">
  <div class="content">
    <hr>
    <router-view></router-view>
    <hr>
  </div>
  <div class="side-bar">
    <div class="user">
      <h1>欢迎{{id}}</h1>
      <a href="#/login">登出</a>
    </div>
    <div class="nav">
      <ul>
        <li><router-link :to="`/admin/${id}/allStaff`"><span>所有员工列表</span></router-link> </li>
        <li><router-link to="/admin/1/planList"><span>培训计划列表</span></router-link> </li>
      </ul>
    </div>
  </div>


</div>
</template>

<script>
  import AllStaff from '../components/AllStaff'
  import PlanList from '../components/PlanList'
    export default {
    data(){
      return{
        view:''
      }
    }
    ,
      name: "admin",
      props:['id'],
      components:{
        AllStaff,
        PlanList
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
      //padding-left: 20px;
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

        line-height: 50px;//让文字居中
        vertical-align: center;
        text-align: center;
        list-style: none;
        padding-left: 20px;
        background: #337AB7;
        height: 50px;
        width: 100%;
        span{
          color: white;
        }
      }

      li:hover{
        background-color: #0e24b7;
      }
      li:focus{
        background-color: #0e24b7;
      }

    }
  }

  .content{
    float: right;
    width: 81%;
    //margin-left: 50px;
  }
hr{
  background: gray;
  height: 2px;
  border: none;
}
  .user h1{
    display: inline-block;
    margin-right: 50px;

  }
</style>
