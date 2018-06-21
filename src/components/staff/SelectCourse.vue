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
          <button  class="btn btn-info" @click="edit(item)">选修该课</button>
          <button class="btn btn-warning " @click="delete_(item)">弃选该课</button>
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
    <more-info :course="tempCourse" v-if="isLooking" ></more-info>
  </div>
</template>

<script>
  import axios from 'axios'
  import MoreInfo from './MoreInfo'
  export default {
    name: "SelectCourse",
    components:{
      MoreInfo
    },
    created(){
      this.getCourse();
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
      searchCourse(key){
        console.log("seaching")
        axios({
          method:'get',
          url:`api/course/${key}`,
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
      delete_(Course){
        this.showNoticeModal = true;
        this.tempCourse = Course;
      },
      look(Course){
        this.tempCourse = Course;
        this.isLooking = true;
      },

    }
  }
</script>

<style scoped>
  .label{
    font-weight: normal;
  }
  .selected{
    background: #CCFFFF !important;
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
