<template>
  <div >
    <div class="modal-backdrop" @click="close" @keyup.esc="close_esc" tabindex="0">

    <div class="modal"  @click="isBack=false">
  <div class="modal-header">
    <slot name="header">
    </slot>
  </div>
    <div class="modal-body">
      <slot name="body">
      </slot>
    </div>
    <div class="modal-footer">
      <slot name="footer">
        <button type="submit" class="btn btn-primary" @click="submit">提交</button>
        <button type="submit" class="btn btn-default" @click="close">关闭</button>
      </slot>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          isBack:true
        }
      },
      name: "formModal",
      methods:{
          close_esc(){
            this.$emit('closeModal')
          },
          close(e){
            //console.log(e.target.className)
            if (!this.isBack){
              this.isBack = true;
              return;
            }
            this.$emit('closeModal')
          },
          submit(){
            this.$emit('submit')
            console.log("submit")
          }
      }
    }
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    background-color: rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center; }
.modal {
  position: absolute;
  margin: 5%;
  background-color: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow: paged-y;display: flex;
  flex-direction: column; }
.modal-header, .modal-footer
{display: flex; }
.modal-header {
  border-bottom: 1px solid #eee;
  color: #4aae9b;
  justify-content: space-between; }
.modal-footer {
  position:relative;
  bottom: 10px;
  justify-content: flex-end;
  padding-top: 5px;
  overflow: hidden }
.modal-body {

  position: relative;
  overflow:auto;}
  .btn{
    color: #4aae9b;
    background: #eee;
  }
  .modal-body span{
    display: inline-block;
    width: 45%;
  }
  .select-group{
    margin-top: 10px;
    display: flex;
  }
  .select-group span{
    float: left;
    width: 30%;
  }
  .close{
    position: absolute;
    right: 5px;
    top: 10px;
    font-size: 20px;
    color: rgb(0,0,0);
    border-radius: 40%;
    background: red;
    z-index: 5;
  }
  .modal-header span{
    float: left;
    background: red;
  }
  .btn-default{
    background: white;
  }
  .selectMenu{
    border: none;
  }
</style>
