<template>
  <div v-if="course.selectedNum!=0">
    <h2>
      <span class="label label-success">{{course.name}}</span>
      <span class="label label-info" style="font-size: medium;">共{{course.selectedNum}}名</span>
      <span class="search"><input @keyup.enter="searchPlan(searchKey)" type="text"  class="form-control search" placeholder="搜索关键字" v-model="searchKey"> </span>
    </h2>
    <table class="table table-bordered  table-hover">
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
      <!--<tr>-->
        <!--<td>888</td>-->
        <!--<td>奥莉安娜</td>-->
        <!--<td>女</td>-->
        <!--<td>设计部</td>-->
        <!--<td>设计师</td>-->
        <!--<td><input type="date"></td>-->
        <!--<td><input type="text" value="99"></td>-->
        <!--<td>-->
          <!--<select  class="selectMenu">-->
            <!--<option value="0">未考核</option>-->
            <!--<option value="1">不及格</option>-->
            <!--<option value="2">及格</option>-->
            <!--<option value="3">良好</option>-->
            <!--<option value="4">优秀</option>-->
          <!--</select>-->
        <!--</td>-->
        <!--<td>删除</td>-->
      <!--</tr>-->
      <tr v-for="item in pageContent[pageNum]" @click="select(item.id)" :class="item.id===selectId?'selected':''">
        <td>{{item.person_id}}</td>
        <td>{{item.person_name}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.department_name}}</td>
        <td>{{item.job}}</td>

        <td>
          <input type="date" v-model.lazy="item.exam_date" @change="updatePlan(item)" >
        </td>
        <td><input type="text" v-model.lazy="item.score" @change="updatePlan(item)" placeholder="填入成绩自动提交"></td>
        <td>
          <select  class="selectMenu" v-model="item.apprisement_code" @change="updatePlan(item)">
            <option value="0">未考核</option>
            <option value="1">不及格</option>
            <option value="2">及格</option>
            <option value="3">良好</option>
            <option value="4">优秀</option>
          </select>
        </td>
        <td>
          <button class="btn btn-danger" @click="delete_(item)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div>
      <button class="btn btn-primary" @click="newPlan">新增</button>
      <button class="btn btn-primary" @click="getExcel">打印</button>
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
        员工ID：<input type="text" class="form-control" placeholder="ID" v-model="tempPlan.person_id">
        分数：<input type="text" class="form-control" placeholder="分数" v-model="tempPlan.score">
        考核时间：<input type="date" class="form-control"  v-model="tempPlan.exam_date">
        评价： <select  class="selectMenu" v-model="tempPlan.apprisement_code">
        <option value="0">未考核</option>
        <option value="1">不及格</option>
        <option value="2">及格</option>
        <option value="3">良好</option>
        <option value="4">优秀</option>
      </select>
      </template>
    </form-modal>
    <notice-modal @delete="deletePlan(tempPlan)" @closeModal="closeModal" v-show="showNoticeModal">
      <template slot="header">
        确定删除记录？
      </template>
    </notice-modal>
    <hr>
  </div>
  <div v-else>
   <h2>
     <span class="label label-warning">该课程暂无学员</span>
   </h2>
  </div>
</template>

<script>
  import formModal from '../formModal'
  import noticeModal from '../noticeModal'
  import axios from 'axios'
  export default {
    name: "PlanStaff",
    components:{
      formModal,
      noticeModal,
    },
    created(){
      console.log("ps created")
      this.getPlan();
    },

    props:['course'],
    watch:{
      course: {
        handler: function (val) {
          console.log("test",val)
          axios({
            method: "get",
            url: `/api/plan/course/${this.course.id}`,
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
      getPlan() {
        axios({
          method: "get",
          url: `/api/plan/course/${this.course.id}`,
        }).then(result => {
          console.log(result.data);
          this.planStaff = result.data;
          this.dividePlan()
        })
      },
      getExcel(){
        window.location.href = `api/plan/course/${this.course.id}/excel`;
        //   axios({
      //     method: 'get',
      //     url: `/api/plan/${this.course.id}/excel`,
      //   }).then(result =>{
      //     console.log(result.data)
      //     console.log('excel')
      //   })
       },
      updatePlan(plan){
        console.log("update start")
        axios({
          method:'put',
          url:"api/plan",
          data:{
            plan,
          }
        }).then(result => {
            if(result.data === - 1){
              alert("修改失败")
            }else {
              this.getPlan()
              this.closeModal();
            }
          }
        )
      },
      postPlan(){
        for (let i=0;i<this.planStaff.length;i++){
          if (this.tempPlan.person_id == this.planStaff[i].person_id){
            this.showFormModal = true;
            alert("插入失败,该学园已加入本课程")
            return;
          }
        }
        axios({
          method:'post',
          url:'api/plan',
          data:{plan:this.tempPlan}
        }).then(response => {
          console.log(response.data)
          if ( response.data === -1)  {
            this.showFormModal = true;
            alert("插入失败，员工ID不存在")
          }
          else{
            this.getPlan();
            this.closeModal();
          }
        })
      },
      deletePlan(plan){
        axios({
          method: 'delete',
          url: 'api/plan',
          data:{id:plan.id,
               course_id:this.course.id}
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
          exam_date :null,
          course_id : this.course.id,
          apprisement_code:0,
          score :null
        };
        this.showFormModal = true
      },
    }
  }
</script>

<style scoped>
  .label{
    font-weight: normal;
  }
  .selectMenu{
    color: deepskyblue;
    border: 1px;
  }
  .selected{
    border:3px solid deepskyblue !important;
  }
  .search{
    display: inline-block;
    float: right;
    width: 40%;
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

  hr{
    background: gray;
    height: 2px;
    border: none;
  }
</style>
