<template>
<div>
  <h2>
    <span class="label label-primary">我的个人信息</span>
  </h2>
  <span>id:<input type="text" class="form-control" placeholder="ID" v-model="userInfo.id"></span>
  <span>姓名：<input type="text" class="form-control" placeholder="姓名" v-model="userInfo.name"></span>
  <div>性别
          <button class="btn btn-default">
          <select v-model="userInfo.sex" class="selectMenu">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </button>
  </div>
  <span>密码：<input type="text" class="form-control" placeholder="密码" v-model="userInfo.password"></span>
  <span>生日：<input type="text" class="form-control" placeholder="生日" v-model="userInfo.birthday"></span>
  <span>教育经历：<input type="text" class="form-control" placeholder="教育经历" v-model="userInfo.edu"></span>
  <span>技能：<input type="text" class="form-control" placeholder="技能" v-model="userInfo.speciaty"></span>
  <span>地址：<input type="text" class="form-control" placeholder="地址" v-model="userInfo.address"></span>
  <span>电话：<input type="text" class="form-control" placeholder="电话" v-model="userInfo.tel"></span>
  <span>邮箱：<input type="text" class="form-control" placeholder="邮箱" v-model="userInfo.email"></span>
  <!--<span>状态：<input type="text" class="form-control" placeholder="状态" v-model="userInfo.state"></span>-->
  <span>备注：<input type="text" class="form-control" placeholder="备注" v-model="userInfo.remark"></span>
  <!--<span>部门：<input type="text" class="form-control" placeholder="部门" v-model="userInfo.department_id"></span>-->
  <span>职位：<input type="text" class="form-control" placeholder="职位" v-model="userInfo.job"></span>
  <div class="select-group">
        <span>
          权限：
          <button class="btn btn-default">
          <select v-model="userInfo.authority" class="selectMenu">
            <option value="0">普通员工</option>
            <option value="1">管理员</option>
          </select>
        </button>
        </span>
    <!--<input type="text" class="form-control" placeholder="权限" v-model="userInfo.authority">-->
    <span>
         状态：
          <button class="btn btn-default">
          <select v-model="userInfo.state" class="selectMenu">
            <option value="0">正式员工</option>
            <option value="1">非正式员工</option>
          </select>
        </button>
       </span>
    <span>
         部门：
         <button class="btn btn-default">
          <select v-model="userInfo.department_id" class="selectMenu">
            <option  v-for="dep in deps" :value="dep.id">{{dep.name}}</option>
            <option value="null">未分配</option>
          </select>
        </button>
       </span>
  </div>
  <button class="btn btn-primary" @click="updateUser(id)">提交</button>
  <hr>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "UserInfo",
        props:['id'],
        created(){
          console.log(this.id)
          this.getUserInfo(this.id)
          this.getDep()
        },
        data(){
          return{
            userInfo:{
            },
            deps:[]
          }
        },
        methods:{
          getDep(){
            axios({
              method: 'get',
              url:'/api/dep'
            }).then(result => {
              console.log(result.data);
              this.deps = result.data;
            })
          },
          getUserInfo(id){
            axios({
              method: 'get',
              url: `api/user/${id}`
            }).then(result => {
             //this.$set(this.userInfo,0,result.data.id)
              this.userInfo = result.data[0];
              console.log(this.userInfo)
              //this.$forceUpdate()
            })
          },
          updateUser(oldId){
            axios({
              method:'put',
              url: 'api/staff',
              data:{
                oldId,
                staff:this.userInfo
              }
            }).then(result => {
              console.log(this.userInfo)
              this.$emit('update',{'id':this.userInfo.id,'name':this.userInfo.name})
            })
          }
        }
    }
</script>

<style scoped>
  hr{
    background: gray;
    height: 2px;
    border: none;
  }
</style>
