<template>
    <div class="login">
      <h1 class="header">登录</h1>
      <form>
        <div class="input-group">
          <span class="input-group-addon" >账 号</span>
          <input type="text" class="form-control" placeholder="User" aria-describedby="basic-addon1" v-model="username">
        </div>
        <div class="input-group">
          <span class="input-group-addon" > 密 码 </span>
          <input type="password" class="form-control" placeholder="Password" aria-describedby="basic-addon1" v-model="password">
        </div>
        <!--<div class="form-group">-->
          <!--<label for="username">帐号名</label>-->
          <!--<input type="text" class="form-control" id="username" placeholder="username" v-model="username">-->
        <!--</div>-->
        <!--<div class="form-group">-->
          <!--<label for="password">密码</label>-->
          <!--<input type="password" class="form-control" id="password" placeholder="password" v-model="password" autocomplete='tel'>-->
        <!--</div>-->
        <button type="submit" class="btn btn-default" @click="login">Submit</button>
      </form>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "login",
      data(){
          return {
            username:'',
            password:''
          }
      },
      methods:{
          login() {
            axios({
              method: 'post',
              url: '/api/login',
              data: {
                username: this.username,
                password: this.password
              }
            }).then(result => {
              let data = result.data;
              console.log(result.data);
              if (data === -1) {
                alert("用户不存在")
              } else if (data === 0) {
                alert("密码错误")
              } else if (data.authority === 1) {
                //管理员
                this.$router.push({
                  name: 'admin',
                  params: {
                    id: result.data.id,
                    name: result.data.name,
                  }
                })
              } else {
                this.$router.push({
                  name: 'staff',
                  params: {
                    id: result.data.id,
                    name: result.data.name,
                  }
                })
              }
              console.log("login ok");
            })
          }

      }

    }
</script>

<style scoped >

.login {
  padding: 20% 40%;
  background: url('../assets/timg.jpeg');
  height: 1000px;

}
.header{
  font-size: 50px;
  color: aliceblue;
  margin-bottom: 15px;
}
.input-group{
  margin-bottom: 15px;
}
.btn{
  width: 100%;
}

</style>
