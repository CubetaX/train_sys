<template>
  <div class="container">
    <div class="content">
      <router-view @update="update"> </router-view>
    </div>
    <div class="side-bar">
      <div class="user" style="font-weight:300" >
        <h1><a href="#/staff/welcome" style="font-weight: 100">{{userName}}</a></h1>
        <a href="#/login" style="display:block;"><span class="glyphicon glyphicon-log-out"></span>登出</a>
      </div>
      <div class="nav">
        <ul>
          <router-link :to="`/staff/selectCourse/${userId}`" > <li :class="selected==1?'selected':''" @click="select(1)"><span class="glyphicon glyphicon-tag"></span>选课列表</li></router-link>
          <router-link :to="`/staff/grade/${userId}`"><li :class="selected==2?'selected':''" @click="select(2)"><span class="glyphicon glyphicon-tag"></span>成绩查询</li></router-link>
          <router-link  :to="`/staff/userInfo/${userId}`"><li :class="selected==3?'selected':''" @click="select(3)"><span class="glyphicon glyphicon-cog"></span>修改个人资料</li></router-link>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>

  export default {
    created(){
      this.$router.push('/staff/welcome')  //'/根目录开始 如果没有则从当前开始'
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
    name: "staff",
    methods:{
      update(argv){
        console.log(argv)
        this.userId = argv.id;
        this.userName = argv.name;
      },
      select(num){
        this.selected = num;
      },
    }
  }
</script>

<style lang="less">
  .container{

    background: white;
    width: 100%;
    height: 100%;
    margin:0;
    padding: 0;
    .side-bar {
      .user{
        padding-left: 30px;
        h1{
          font-style: normal;
          display: inline-block;
          margin-right: 50px;
        };
      }

      height: 1000px;
      width: 20%;
      background: rgba(36, 190, 214, 0.54);
      color: white;
      ul{
        padding: 0;
        span{
          padding-right: 8px;
        }
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
        padding-left: 0px;
        background: #26c3dd;
        height: 50px;
        width: 100%;
      }

      li:hover{
        background-color: rgba(23, 161, 224, 0.91);
      }
      .selected{
        background-color: rgba(23, 161, 224, 0.91);
      }
    }
  }

  .content{
    float: right;
    width: 79%;
    //margin-left: 50px;
  }

  /*.fade-enter-active,.fade-leave-active{*/
  /*transition:  all 1s ease-out;*/
  /*opacity: 1;*/
  /*}*/
  /*!* 进入开始 *!*/
  /*.fade-enter{*/
  /*transform: translateY(0px);*/
  /*opacity: 0;*/
  /*}*/
  /*!* 出去终点 *!*/
  /*.fade-leave-active{*/
  /*transform: translateY(-500px);*/
  /*opacity: 0;*/
  /*}*/

</style>
