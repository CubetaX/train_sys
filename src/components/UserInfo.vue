<template>
<div>
  <h2>
    <span class="label label-primary">我的个人信息</span>
  </h2>

  <div class="input-group">
    <span class="input-group-addon" >I D</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.id">
  </div>

  <div class="input-group">
    <span class="input-group-addon" >密码</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.password">
  </div>
  <div class="input-group">
    <span class="input-group-addon" >姓名</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.name">
  </div>

  <div class="input-group">
    <span class="input-group-addon" >生日</span>
    <input type="date" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.birthday">
  </div>

  <div class="input-group">
    <span class="input-group-addon" >性别</span>
    <select v-model="userInfo.sex" class="selectMenu">
      <option value="男">男</option>
      <option value="女">女</option>
    </select>
  </div>

  <div class="input-group">
    <span class="input-group-addon" >学历</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.edu">
  </div>

   <div class="input-group">
    <span class="input-group-addon" >技能</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.speciaty">
  </div>

  <div class="input-group">
    <span class="input-group-addon" >地址</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.address">
  </div>

  <div class="input-group">
    <span class="input-group-addon" >电话</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.tel">
  </div>
  <div class="input-group">
    <span class="input-group-addon" >邮箱</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.email">
  </div>
  <div class="input-group">
    <span class="input-group-addon" >备注</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.remark">
  </div>
  <div class="input-group">
    <span class="input-group-addon" >职位</span>
    <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="userInfo.job">
  </div>
  <div class="input-group">
    <span class="input-group-addon"  >权限</span>
    <select v-model="userInfo.authority" class="selectMenu">
      <option value="0">普通员工</option>
      <option value="1">管理员</option>
    </select>
  </div>
  <div class="input-group">
    <span class="input-group-addon" >部门</span>
    <select v-model="userInfo.department_id" class="selectMenu">
      <option  v-for="dep in deps" :value="dep.id">{{dep.name}}</option>
      <option value="null">未分配</option>
    </select>
  </div>
  <div class="input-group">
    <span class="input-group-addon" >状态</span>
    <select v-model="userInfo.state" class="selectMenu">
      <option value="0">正式员工</option>
      <option value="1">非正式员工</option>
    </select>
  </div>
  <button class="btn btn-primary" @click="updateUser()">提交修改</button>
  <div v-show='state===1' class="alert alert-success" role="alert">修改成功！</div>
  <div v-show='state===-1' class="alert alert-danger" role="alert">修改失败！请检查输入数据是否规范 !  {{errMsg}}</div>
  <hr>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "UserInfo",
        props:['id'],
        created(){
          this.getUserInfo(this.id)
          this.getDep()
        },
        data(){
          return{
            userInfo:{
            },
            oldId:this.id,
            deps:[],
            state:null,
            errMsg:''
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
              this.userInfo = result.data[0];
            })
          },
          updateUser(){
            this.state = null;
            axios({
              method:'put',
              url: 'api/staff',
              data:{
                oldId:this.oldId,
                staff:this.userInfo
              }
            }).then(result => {
              if (result.data!==1){
                this.errMsg = result.data;
                this.state = -1;
              }
              else {
                this.oldId = this.userInfo.id;
                this.state = 1;
                console.log(this.userInfo)
                this.$emit('update',{'id':this.userInfo.id,'name':this.userInfo.name})
              }

            })
          }
        }
    }
</script>

<style scoped>
  .label{
    font-weight: normal;
  }
  .alert{
    margin-top: 5px;}
  .input-group{
    margin-bottom: 5px;
  }
  .selectMenu{
    height: 35px;
  }
  hr{
    background: gray;
    height: 2px;
    border: none;
    width: 100%;
  }
</style>
