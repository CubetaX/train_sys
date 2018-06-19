<template>
<div>
  <h2>
    <span class="label label-primary">所有员工信息</span>
    <span class="label label-info">共有{{staff.length}}条信息</span>
    <span class="search"><input @keyup.enter="searchStaff(searchKey)" type="text"  class="form-control search" placeholder="搜索关键字" v-model="searchKey"> </span>
  </h2>

  <table class="table table-striped">
    <thead>
    <tr>
      <th>#</th>
      <th>姓名</th>
      <th>性别</th>
      <th>部门</th>
      <th>职位</th>
      <th>电话</th>
      <th>权限</th>
      <th>额外操作</th>
    </tr>
    </thead>
  <tbody >
  <!--<tr>-->
    <!--<td>1</td>-->
    <!--<td>小明</td>-->
    <!--<td>男</td>-->
    <!--<td>计算机</td>-->
    <!--<td>开发工程师</td>-->
    <!--<td>17685379583</td>-->
    <!--<td>管理員</td>-->
    <!--<td>-->
      <!--<span>修改</span>-->
      <!--<span>删除</span>-->
    <!--</td>-->
  <!--</tr>-->
  <tr v-for="item in pageContent[pageNum]">
    <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.sex}}</td>
    <td>{{item.department_id}}</td>
    <!--<td v-if="item.department_id==null"></td>-->
    <!--<td v-else v-for="dep in deps" v-if="item.department_id==dep.id">{{dep.name}}</td>-->
    <td>{{item.job}}</td>
    <td>{{item.tel}}</td>
    <td v-if="item.authority===1">管理员</td>
    <td v-else>普通员工</td>
    <td>
      <span @click="edit(item)">修改</span>
      <span @click="delete_(item)">删除</span>
    </td>
  </tr>
  </tbody>

  </table>
  <div>
    <button class="btn btn-primary" @click="newStaff">新增员工</button>
    <div class="pageControl">
      <button class="btn btn-default" @click="prePage" v-if="pageNum!=0">上一页</button>
      <button class="btn btn-default" @click="nextPage" v-if="pageNum!=(pageContent.length-1)">下一页</button>
      <span>第{{pageNum+1+'  '}}/{{pageContent.length}}页</span>
    </div>

  </div>

  <form-modal  @submit="isEditing?updateStaff(tempStaff,oldId):postStaff()"   @closeModal="closeModal" v-show="showFormModal">
    <template slot="header">
      填写员工信息
    </template>
    <template slot="body">
      <span>id:<input type="text" class="form-control" placeholder="ID" v-model="tempStaff.id"></span>
      <span>姓名：<input type="text" class="form-control" placeholder="姓名" v-model="tempStaff.name"></span>
      <span>性别
          <button class="btn btn-default">
          <select v-model="tempStaff.sex" class="selectMenu">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </button></span>
      <span>密码：<input type="text" class="form-control" placeholder="密码" v-model="tempStaff.password"></span>
      <span>生日：<input type="text" class="form-control" placeholder="生日" v-model="tempStaff.birthday"></span>
      <span>教育经历：<input type="text" class="form-control" placeholder="教育经历" v-model="tempStaff.edu"></span>
      <span>技能：<input type="text" class="form-control" placeholder="技能" v-model="tempStaff.speciaty"></span>
      <span>地址：<input type="text" class="form-control" placeholder="地址" v-model="tempStaff.address"></span>
      <span>电话：<input type="text" class="form-control" placeholder="电话" v-model="tempStaff.tel"></span>
      <span>邮箱：<input type="text" class="form-control" placeholder="邮箱" v-model="tempStaff.email"></span>
      <!--<span>状态：<input type="text" class="form-control" placeholder="状态" v-model="tempStaff.state"></span>-->
      <span>备注：<input type="text" class="form-control" placeholder="备注" v-model="tempStaff.remark"></span>
      <!--<span>部门：<input type="text" class="form-control" placeholder="部门" v-model="tempStaff.department_id"></span>-->
      <span>职位：<input type="text" class="form-control" placeholder="职位" v-model="tempStaff.job"></span>
      <div class="select-group">
        <span>
          权限：
          <button class="btn btn-default">
          <select v-model="tempStaff.authority" class="selectMenu">
            <option value="0">普通员工</option>
            <option value="1">管理员</option>
          </select>
        </button>
        </span>
        <!--<input type="text" class="form-control" placeholder="权限" v-model="tempStaff.authority">-->
       <span>
         状态：
          <button class="btn btn-default">
          <select v-model="tempStaff.state" class="selectMenu">
            <option value="0">正式员工</option>
            <option value="1">非正式员工</option>
          </select>
        </button>
       </span>
       <span>
         部门：
         <button class="btn btn-default">
          <select v-model="tempStaff.department_id" class="selectMenu">
            <option  v-for="dep in deps" :value="dep.id">{{dep.name}}</option>
            <option value="null">未分配</option>
          </select>
        </button>
       </span>

      </div>
    </template>
  </form-modal>
  <notice-modal @deleteStaff="deleteStaff(tempStaff)" @closeModal="closeModal" v-show="showNoticeModal">
    <template slot="header">
      确定删除员工id号：{{tempStaff.id}} 姓名：{{tempStaff.name}}？
    </template>
  </notice-modal>
  <hr>
</div>
</template>

<script>
  import axios from 'axios'
  import formModal from './formModal'
  import noticeModal from './noticeModal'
  import index from "../router";
    export default {
      data(){
        return{
          staff:[],
          showFormModal:false,
          showNoticeModal:false,
          tempStaff:{
            id: '',
            name: '',
            sex: '',
            address: '',
            tel: '',
            birthday: '',
            job: '',
            password: '',
            edu: '',
            speciaty: '',
            email: '',
            remark: '',
            department_id: null,
            state: null,
            authority: null,

          },
          oldId:null,
          pageContent:[],
          pageNum: 0,
          isEditing: false,
          searchKey:'',
          deps:[],
        }
      },
      components:{
        formModal,
        noticeModal
      },
      name: "AllStaff",
      props:["username"],
      created(){
        console.log("created~")
        this.getStaff(); //先执行下面
        this.getDep();
        console.log(this.dep)
      },
      methods:{
        nextPage(){
          this.pageNum++;
          //this.$forceUpdate()
        },
        prePage(){
          this.pageNum--;
          //this.$forceUpdate()
        },
        divideStaff(){
          this.pageContent = [];
          let pageLen = 5;//每页显示的长度
          for (let i=0; i<this.staff.length/pageLen ;i++){
            this.$set(this.pageContent,i,this.staff.slice(i*pageLen,(i+1)*pageLen))
           // this.pageContent[i] = this.staff.slice(i*pageLen,(i+1)*pageLen)
          }
          // for (let i=0; i<this.pageContent.length;i++){
          //   console.log("分组内容",this.pageContent[i]);
          // }
          // console.log("!!",this.pageContent[this.pageNum])
          //this.$forceUpdate();
        },
        getDep(){
          axios({
            method: 'get',
            url:'/api/dep'
          }).then(result => {
            console.log(result.data);
            this.deps = result.data;
          })
        },
        getStaff(){ //获取所有员工列表
          axios({
            method: "get",
            url: '/api/staff'
          }).then(result => {
            console.log(result.data);
            this.staff = result.data;
            this.divideStaff()
          })
        },
        postStaff(){
          console.log('post')
          axios({
            method:'post',
            url:'api/staff',
            data:{staff:this.tempStaff}
          }).then(response => {
            console.log(response.data)
            if ( response.data === -1)  {
              alert("插入失败")
            }
            else{
              alert("插入成功")
              this.closeModal();
              this.getStaff()
            }
          })
        },
        deleteStaff(staff){
          axios({
            method: 'delete',
            url: 'api/staff',
            data:{id:staff.id}
          }).then( result => {
            if(result.data === - 1){
              alert("删除失败")
            }else {
              alert("删除成功")
              this.getStaff()
            }
          }
          )
        },
        updateStaff(staff,oldId){
          console.log("update start")
          axios({
            method:'put',
            url:"api/staff",
            data:{
              staff,
              oldId
            }
            }).then(result => {
                if(result.data === - 1){
                  alert("修改失败")
                }else {
                  alert("修改成功")
                  this.getStaff()
                  this.closeModal();
                }
              }
            )
          },
        searchStaff(key){
          alert(key);
          console.log("seaching")
          axios({
            method:'get',
            url:`api/staff/${key}`,
            params:{
              'key':key,
            },
          }).then(result =>{
            if (result.data.length ===0 ){
              alert("没有查到任何信息")
            }
            else{
              alert("查到"+result.data.length +"信息")
              console.log(result.data);
              this.staff = result.data;
              this.divideStaff()
            }
          })
        },
        //界面操作
        delete_(staff){
          this.showNoticeModal = true;
          this.tempStaff = staff;
        },
        edit(staff){
          this.isEditing = true;
          this.showFormModal = true;
          this.tempStaff = staff;
          this.oldId = staff.id;
        },
        closeModal(){
          this.isEditing = false;
          this.showFormModal = false;
          this.showNoticeModal = false
        },
        newStaff(){
          this.tempStaff = {
            id: '',
              name: '',
              sex: '',
              address: '',
              tel: '',
              birthday: '',
              job: '',
              password: '',
              edu: '',
              speciaty: '',
              email: '',
              remark: '',
              department_id: null,
              state: null,
              authority: null,
          }
          this.showFormModal = true;
        }

      }
    }
</script>

<style scoped>
  .search{
    display: inline-block;
    float: right;
    width: 30%;
  }
  thead{
    background:#CCFFFF;
  }
  tbody span{
    color: deepskyblue;
  }
  tbody span:hover{
    cursor: pointer;
  }
  .notNulll{
    color: red;
  }
 .pageControl {
   float: right;
 }
  hr{
    background: gray;
    height: 2px;
    border: none;
  }

</style>
