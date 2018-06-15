<template>
  <div>
    <!--<h2>-->
      <!--<span class="label label-info">{{course.name}}</span>-->
      <!--<span class="label label-info">{{course.num}}</span>-->
    </h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th></th>
        <th>员工id</th>
        <th>姓名</th>
        <th>性别</th>
        <th>部门</th>
        <th>职位</th>
        <th>分数</th>
        <th>评价</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>成龙</td>
        <td>男</td>
        <td>设计部</td>
        <td>设计师</td>
        <td>100</td>
        <td>优秀</td>
        <td>修改</td>
      </tr>
      <tr v-for="item in courses">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.classtime}}</td>
        <td>{{item.classroom}}</td>
        <td>{{item.teacher_id}}</td>
        <td>{{item.number}}</td>
        <td>{{item.course_state_code}}</td>
        <td>
          <!--<span>修改</span>-->
          <!--<span v-if="">考核时间</span>-->
          <!--<span v-else>添加考核时间</span>-->
          <!--<span>学员列表</span>-->
        </td>


      </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" @click="showFormModal=true">新增课程计划</button>
    <form-modal @submit="postCourse" @closeModal="closeModal" v-show="showFormModal">
      <template slot="header">
        修改信息
      </template>
      <template slot="body">
        <span class="notNull">*</span>
        ID：<input type="text" class="form-control" placeholder="ID" v-model="tempCourse.id">
        课程名：<input type="text" class="form-control" placeholder="课程名" v-model="tempCourse.name">
        授课老师：<input type="text" class="form-control" placeholder="授课老师" v-model="tempCourse.teacher_id">
        介绍：<input type="text" class="form-control" placeholder="介绍" v-model="tempCourse.intro">
        教材：<input type="text" class="form-control" placeholder="教材" v-model="tempCourse.book">
        上课教室：<input type="text" class="form-control" placeholder="上课人数" v-model="tempCourse.classroom">
        上课人数：<input type="text" class="form-control" placeholder="上课人数" v-model="tempCourse.number">
        上课时间：<input type="text" class="form-control" placeholder="上课时间" v-model="tempCourse.classtime">
        课程状态<input type="text" class="form-control" placeholder="课程状态" v-model="tempCourse.course_state_code">
      </template>
    </form-modal>
    <!--<notice-modal @deleteCourse="deleteCourse" @closeModal="closeModal" v-show="showNoticeModal">-->
    <!--<template slot="header">-->
    <!--确定删除课程id号：{{tempCourse.id}} 课程名：{{tempCourse.name}}？-->
    <!--</template>-->
    <!--</notice-modal>-->
    <button class="btn btn-primary">导出成绩列表</button>
  </div>
</template>

<script>
    export default {
        name: "PlanStaff",
      data(){
          return{
            course:{}
          }
      }
    }
</script>

<style scoped>

</style>
