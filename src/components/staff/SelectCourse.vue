<template>
  <div>
    <h2>
      <span class="label label-primary">已有培训计划</span>
      <span class="label label-info" style="font-size: medium;">共{{courses.length}}条 </span>
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
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in pageContent[pageNum] "@dblclick="select(item.id);look(item)" :class="item.id===selectId?'selected':''">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.classtime}}</td>
        <td>{{item.classroom}}</td>
        <td>{{item.teacher_id}}</td>
        <td>{{item.selectedNum}}/{{item.number}}</td>

        <td v-if="item.course_state_code==0">
          选课中
        </td>
        <td v-else-if="item.course_state_code==1">
          进行中
        </td>
        <td v-else>
          已结束
        </td>
        <td>
          <button class="btn btn-default" style="color: gray" v-if="item.course_state_code==2&&item.plan_id==null">课程已结束</button>
          <button class="btn btn-default" style="color: gray" v-else-if="item.number==item.selectedNum">课程已满</button>
          <button  class="btn btn-info" @click="select_(item);postCourseWithStaff(item)" v-else-if="item.plan_id==null">选修</button>
          <button class="btn btn-warning " @click="delete_(item)" v-else>弃选</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div>
      <div class="pageControl">
        <button class="btn btn-default" @click="prePage" v-if="pageNum!=0">上一页</button>
        <button class="btn btn-default" @click="nextPage" v-if="pageNum!=(pageContent.length-1)">下一页</button>
        <span>第{{pageNum+1+'  '}}/{{pageContent.length}}页</span>
      </div>
    </div>
    <hr>
    <div>
      <h2><span class="label label-success" v-if="isLooking">更多信息</span></h2>
      <div class="alert alert-info alert-dismissible"  v-if="isLooking" style="color:black;font-size: 20px;background: #f0f0f0">
        <button type="button" class="close"  @click="isLooking=false"><span>&times;</span></button>
        <p>
          <strong>课程介绍 : </strong>{{tempCourse.intro}}
        </p>
        <p>
          <strong>教材 : </strong> {{tempCourse.book}}
        </p>
      </div>
    </div>

    <notice-modal @delete="deleteCourseWithStaff" @closeModal="closeModal" v-show="showNoticeModal">
      <template slot="header">确定弃选？(已有成绩将不再保留)</template>
    </notice-modal>

  </div>
</template>

<script>
  import axios from 'axios'
  import NoticeModal from '../noticeModal'

  export default {
    name: "SelectCourse",
    components:{
      NoticeModal
    },
    props:['id'],
    created(){
      this.getCourse();
    },
    data(){
      return{
        searchKey:'',
        isSelected:false,
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
          classtime: null,
          course_state_code:0,
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
        this.courses=[]
        this.tempCourse={}
        axios({
          method: "get",
          url: `/api/courseWithStaff/${this.id}`
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
      postCourseWithStaff(){
        axios({
          method:'post',
          url:'api/plan',
          data:{
            plan: {
              person_id: this.id,
              course_id: this.tempCourse.id,
              apprisement_code: 0,
              score: null,
              exam_date: null,
            }
          }
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
      deleteCourseWithStaff(){
        axios({
          method: 'delete',
          url: 'api/plan',
          data:{
            plan:{
              id:this.tempCourse.plan_id,
              course_id:this.tempCourse.id
            }
          }
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
      searchCourse(key){
        console.log("seaching")
        axios({
          method:'get',
          url:`api/courseWithStaff/${this.id}/${key}`,
        }).then(result =>{
          if (result.data.length ===0 ){
            alert("没有查到任何信息")
          }
          else{
            alert("查到"+result.data.length +"信息")
            console.log(result.data);
            this.courses = result.data;
            this.divideCourse()
          }
        })
      },
      select_(Course){
        this.tempCourse = Course;
      },
      delete_(Course){
        this.showNoticeModal = true;
        this.tempCourse = Course;
      },
      look(Course){
        this.tempCourse = Course;
        this.isLooking = true;
      },
      closeModal(){
        this.showFormModal = false;
        this.showNoticeModal = false
      },
    }
  }
</script>

<style scoped>
  .label{
    font-weight: normal;
  }
  .selected{
    background: rgba(86, 255, 228, 0.15) !important;
  }
  .search{
    display: inline-block;
    float: right;
    width: 40%;
  }
  .pageControl{
    text-align: end;
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
