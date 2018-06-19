<template>
    <div class="login">
      <h1 class="header">登录</h1>
      <form>
        <div class="form-group">
          <label for="username">帐号名</label>
          <input type="text" class="form-control" id="username" placeholder="username" v-model="username">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" class="form-control" id="password" placeholder="password" v-model="password" autocomplete='tel'>
        </div>
        <button type="submit" class="btn btn-primary" @click="login">Submit</button>
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
  margin: 25%;
  padding-bottom: 50px;

}
.header{
  font-size: 50px;

}
.btn{
  width: 100%;
}

</style>
