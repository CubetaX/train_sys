<template>
  <div v-if="course.selectedNum!=0">
    <h2>
      <span class="label label-success">{{course.name}}</span>
      <span class="label label-info">共有{{course.selectedNum}}名员工</span>
      <span class="search"><input @keyup.enter="searchPlan(searchKey)" type="text"  class="form-control search" placeholder="搜索关键字" v-model="searchKey"> </span>
    </h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>员工ID</th>
        <th>员工姓名</th>
        <th>性别</th>
        <th>部门</th>
        <th>职位</th>
        <th>考核日期</th>
        <th>分数</th>
        <th>评价</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>888</td>
        <td>奥莉安娜</td>
        <td>女</td>
        <td>设计部</td>
        <td>设计师</td>
        <td><input type="date"></td>
        <td><input type="text" value="99"></td>
        <td>
          <select  class="selectMenu">
            <option value="0">未考核</option>
            <option value="1">不及格</option>
            <option value="2">及格</option>
            <option value="3">良好</option>
            <option value="4">优秀</option>
          </select>
        </td>
        <td>删除</td>
      </tr>
      <tr v-for="item in pageContent[pageNum]" @click="select(item.id)" :class="item.id===selectId?'selected':''">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.department_id}}</td>
        <td>{{item.job}}</td>

        <td>
          <span v-if="!item.exam_date">添加</span>
          <span v-else>{{item.exam_date}}</span>
        </td>
        <td><input type="text" v-model="item.score"></td>
        <td>
          <span v-if="!item.apprisement_code">添加</span>
          <span v-else>{{item.apprisement_name}}</span>
        </td>
        <td>
          <span @click="delete_(item)">删除</span>
        </td>
      </tr>
      </tbody>
    </table>

    <div>
      <button class="btn btn-primary" @click="newPlan">新增选修信息</button>
      <div class="pageControl">
        <button class="btn btn-default" @click="prePage" v-if="pageNum!=0">上一页</button>
        <button class="btn btn-default" @click="nextPage" v-if="pageNum!=(pageContent.length-1)">下一页</button>
        <span>第{{pageNum+1+'  '}}/{{pageContent.length}}页</span>
      </div>
    </div>
    <form-modal @submit="isEditing?updatePlan(tempPlan,oldId):postPlan()" @click="showFormModal=true" @closeModal="closeModal" v-show="showFormModal">
      <template slot="header">
        填写课程信息
      </template>
      <template slot="body">
        <span class="notNull">*</span>
        ID：<input type="text" class="form-control" placeholder="ID" v-model="tempPlan.id">
        课程名：<input type="text" class="form-control" placeholder="课程名" v-model="tempPlan.name">
        授课老师：<input type="text" class="form-control" placeholder="授课老师" v-model="tempPlan.teacher_id">
        介绍：<input type="text" class="form-control" placeholder="介绍" v-model="tempPlan.intro">
        教材：<input type="text" class="form-control" placeholder="教材" v-model="tempPlan.book">
        上课教室：<input type="text" class="form-control" placeholder="上课人数" v-model="tempPlan.classroom">
        上课人数：<input type="text" class="form-control" placeholder="上课人数" v-model="tempPlan.number">
        上课时间：<input type="text" class="form-control" placeholder="上课时间" v-model="tempPlan.classtime">
        课程状态<input type="text" class="form-control" placeholder="课程状态" v-model="tempPlan.course_state_code">
      </template>
    </form-modal>
    <notice-modal @deletePlan="deletePlan" @closeModal="closeModal" v-show="showNoticeModal">
      <template slot="header">
        确定删除课程id号：{{tempPlan.id}} 课程名：{{tempPlan.name}}？
      </template>
    </notice-modal>
    <!--<PlanStaff :></PlanStaff>-->
    <hr>
  </div>
  <div v-else>
   <h2>
     <span class="label label-warning">该课程暂无学员</span>
   </h2>
  </div>
</template>

<script>
  import formModal from './formModal'
  import noticeModal from './noticeModal'
  import axios from 'axios'
  export default {
    name: "PlanStaff",
    components:{
      formModal,
      noticeModal,
    },
    created(){
      console.log("ps created")
      this.getPlanStaff(this.course.id);
    },

    props:['course'],
    watch:{
      course: {
        handler: function (val) {
          console.log("test",val)
          axios({
            method: "get",
            url: `/api/plan/${this.course.id}`,
          }).then(result => {
            console.log(result.data);
            this.planStaff = result.data;
            this.dividePlan()
          })
        },
        deep: true
        }
      },
    data(){
      return{
        planStaff:[],
        searchKey:'',
        isEditing:false,
        pageContent:[],
        pageNum:0,
        showFormModal: false,
        showNoticeModal: false,
        courses:[],
        tempPlan:{

        },
        oldId:null,
        selectId:'',
      }
    },
    methods: {
      select(selectId){
        this.selectId = selectId;
      },
      nextPage(){
        this.pageNum++;
        //this.$forceUpdate()
      },
      prePage(){
        this.pageNum--;
        //this.$forceUpdate()
      },
      dividePlan(){
        this.pageContent = [];
        let pageLen = 3;//每页显示的长度
        for (let i=0; i<this.planStaff.length/pageLen ;i++){
          this.$set(this.pageContent,i,this.planStaff.slice(i*pageLen,(i+1)*pageLen))
        }
      },
      getPlanStaff(val,oldVal) {
        axios({
          method: "get",
          url: `/api/plan/${this.course.id}`,
         // params:{'id':this.course.id}
        }).then(result => {
          console.log(result.data);
          this.planStaff = result.data;
          this.dividePlan()
        })
      },

      updatePlan(course,oldId){
        console.log("update start")
        axios({
          method:'put',
          url:"api/course",
          data:{
            course,
            oldId
          }
        }).then(result => {
            if(result.data === - 1){
              alert("修改失败")
            }else {
              alert("修改成功")
              this.getPlan()
              this.closeModal();
            }
          }
        )
      },
      postPlan(){
        axios({
          method:'post',
          url:'api/plan',
          data:{course:this.tempPlan}
        }).then(response => {
          console.log(response.data)
          if ( response.data === -1)  {
            this.showFormModal = true;
            alert("插入失败")
          }
          else{
            this.getPlan();
            this.closeModal();
          }
        })
      },
      deletePlan(course){
        axios({
          method: 'delete',
          url: 'api/plan',
          data:{id:course.id}
        }).then( result => {
            if(result.data === - 1){
              alert("删除失败")
            }else {
              alert("删除成功")
              this.getPlan()
            }
          }
        )
      },
      delete_(Plan){
        this.showNoticeModal = true;
        this.tempPlan = Plan;
      },
      edit(Plan){
        this.isEditing = true;
        this.showFormModal = true;
        this.tempPlan = Plan;
        this.oldId = Plan.id;
      },
      closeModal(){
        this.isEditing = false;
        this.showFormModal = false;
        this.showNoticeModal = false
      },
      newPlan(){
        this.tempPlan = {
        };
        this.showFormModal = true
      },
    }
  }
</script>

<style scoped>
  .selectMenu{
    color: deepskyblue;
    border: 0;
  }
  .selected{
    border:3px solid deepskyblue !important;
  }
  .search{
    display: inline-block;
    float: right;
    width: 30%;
  }
  .pageControl{
    float: right;
  }
  thead{
    background-color:#CCFFFF ;
  }
  tbody span{
    color: deepskyblue;
  }
  tbody span:hover{
    cursor: pointer;
  }
  input{
    border: 0;
  }
  hr{
    background: gray;
    height: 2px;
    border: none;
  }
</style>
