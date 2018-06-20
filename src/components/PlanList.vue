<template>
    <div>
      <h2>
        <span class="label label-primary">已有培训计划</span>
        <span class="label label-info">共有{{courses.length}}条信息</span>
        <span class="search"><input @keyup.enter="searchCourse(searchKey)" type="text"  class="form-control search" placeholder="搜索关键字" v-model="searchKey"> </span>
      </h2>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>课程编号</th>
          <th>课程名</th>
          <th>开课时间</th>
          <th>上课地点</th>
          <th>任课老师</th>
          <th>人数上限</th>
          <th>状态</th>
          <th>学员列表</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <!--<tr>-->
          <!--<td>1</td>-->
          <!--<td>JAVA</td>-->
          <!--<td>0518</td>-->
          <!--<td>逸夫楼308</td>-->
          <!--<td>德玛西亚</td>-->
          <!--<td>60</td>-->
          <!--<td>正在上课</td>-->
          <!--<td>2018-5-18</td>-->
          <!--<td>修改</td>-->
        <!--</tr>-->
        <tr v-for="item in pageContent[pageNum] "@dblclick="select(item.id);look(item)" :class="item.id===selectId?'selected':''">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.classtime}}</td>
          <td>{{item.classroom}}</td>
          <td>{{item.teacher_id}}</td>
          <td>{{item.selectedNum}}/{{item.number}}</td>

          <td>
            <select v-model="item.course_state_code" class="selectMenu" @change="updateCourse(item,item.id)"  style="color: deepskyblue; border: deepskyblue">
            <option value="0">选课中</option>
            <option value="1">进行中</option>
            <option value="2">已结束</option>
            </select>
          </td>

          <td><button class="btn btn-default" @click="look(item)">查看</button>
          <td>
            <button class="btn btn-default" @click="edit(item)">修改</button>
            <button class="btn btn-danger" @click="delete_(item)">删除</button>
          </td>

        </tr>
        </tbody>
      </table>

      <div>
        <button class="btn btn-primary" @click="newCourse">新增课程信息</button>
        <div class="pageControl">
          <button class="btn btn-default" @click="prePage" v-if="pageNum!=0">上一页</button>
          <button class="btn btn-default" @click="nextPage" v-if="pageNum!=(pageContent.length-1)">下一页</button>
          <span>第{{pageNum+1+'  '}}/{{pageContent.length}}页</span>
        </div>
      </div>
      <form-modal @submit="isEditing?updateCourse(tempCourse,oldId):postCourse()" @click="showFormModal=true" @closeModal="closeModal" v-show="showFormModal">
        <template slot="header">
          填写课程信息
        </template>
        <template slot="body">
          <span>id:<input type="text" class="form-control" placeholder="ID" v-model="tempCourse.id"></span>
          <span>课程名：<input type="text" class="form-control" placeholder="姓名" v-model="tempCourse.name"></span>
          <span>老师：<input type="text" class="form-control" placeholder="老师" v-model="tempCourse.teacher_id"></span>
          <span>简介：<input type="text" class="form-control" placeholder="简介" v-model="tempCourse.intro"></span>
          <span>教材：<input type="text" class="form-control" placeholder="教材" v-model="tempCourse.book"></span>
          <span>教室：<input type="text" class="form-control" placeholder="教室" v-model="tempCourse.classroom"></span>
          <span>人数：<input type="text" class="form-control" placeholder="人数" v-model="tempCourse.number"></span>
          <span>上课时间：<input type="date" class="form-control" v-model="tempCourse.classtime"></span>
          <span>
         状态：
          <button class="btn btn-default">
          <select v-model="tempCourse.course_state_code" class="selectMenu">
            <option value="0" >选课中</option>
            <option value="1">进行中</option>
            <option value="2">已结束</option>
          </select>
        </button>
       </span>
        </template>
      </form-modal>
      <notice-modal @delete="deleteCourse(tempCourse)" @closeModal="closeModal" v-show="showNoticeModal">
        <template slot="header">
          确定删除课程id号：{{tempCourse.id}} 课程名：{{tempCourse.name}}？
        </template>
      </notice-modal>
      <hr>
      <PlanStaff :course="tempCourse" v-if="isLooking" ></PlanStaff>
    </div>
</template>

<script>
  import formModal from './formModal'
  import noticeModal from './noticeModal'
  import axios from 'axios'
  import PlanStaff from './PlanStaff'
    export default {
        name: "PlanList",
      components:{
          formModal,
        noticeModal,
        PlanStaff
      },
        created(){
          this.getCourse();
          //this.getPlanList()
        },
      data(){
          return{
            searchKey:'',
            isEditing:false,
            isLooking:false,
            pageContent:[],
            pageNum:0,
            showFormModal: false,
            showNoticeModal: false,
            courses:[],
            tempCourse:{
              id:'',
              name: '',
              teacher_id: null,
              intro:'',
              book:'',
              classroom: '',
              number: null,
              classtime: '',
              course_state_code:null,
              selectedNum:0,
            },
            oldId:null,
            courseName:'',
            selectId:'',


          }
      },
        methods: {
          test(){alert('test')},
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
          divideCourse(){
            this.pageContent = [];
            let pageLen = 5;//每页显示的长度
            for (let i=0; i<this.courses.length/pageLen ;i++){
              this.$set(this.pageContent,i,this.courses.slice(i*pageLen,(i+1)*pageLen))
            }
          },
          getCourse() {
            axios({
              method: "get",
              url: '/api/course'
            }).then(result => {
              console.log(result.data);
              this.courses = result.data;
              this.divideCourse()
            })
          },
          updateCourse(course,oldId){
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
                 // alert("修改成功")
                  this.getCourse()
                  this.closeModal();
                }
              }
            )
          },
          postCourse(){
            axios({
              method:'post',
              url:'api/course',
              data:{course:this.tempCourse}
            }).then(response => {
              console.log(response.data)
              if ( response.data === -1)  {
                this.showFormModal = true;
                alert("插入失败")
              }
              else{
                this.getCourse();
                this.closeModal();
              }
            })
          },
          deleteCourse(course){
            axios({
              method: 'delete',
              url: 'api/course',
              data:{id:course.id}
            }).then( result => {
                if(result.data === - 1){
                  alert("删除失败")
                }else {
                  alert("删除成功")
                  this.getCourse()
                }
              }
            )
          },
          delete_(Course){
            this.showNoticeModal = true;
            this.tempCourse = Course;
          },
          edit(Course){
            this.isEditing = true;
            this.showFormModal = true;
            this.tempCourse = Course;
            this.oldId = Course.id;
          },
          look(Course){
            this.tempCourse = Course;
            this.isLooking = true;
          },
          closeModal(){
            this.isEditing = false;
            this.showFormModal = false;
            this.showNoticeModal = false
          },
          newCourse(){
            this.tempCourse = {
                id:'',
                name: '',
                teacher_id: null,
                intro:'',
                book:'',
                classroom: '',
                number: null,
                classtime: '',
                course_state_code:null,
                selectedNum:0,
            };
            this.showFormModal = true
          },

        }
    }
</script>

<style scoped>
  .selected{
    background: #CCFFFF !important;
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
    background:#CCFFFF;
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
