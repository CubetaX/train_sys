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
  .modal-backdrop
  { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,.3); display: flex; justify-content: center; align-items: center; }
  .modal {
    top: 20%;
    left: 20%;
    height: 60%;
    width: 60%;
    background-color: #fff; box-shadow: 2px 2px 20px 1px;

    display: flex;
    flex-direction: column; }
  .modal-header ,.modal-footer
  { padding: 15px; }
  .modal-header
  { border-bottom: 1px solid #eee; color: #4aae9b; justify-content: space-between; }
  .modal-footer
  { border-top: 1px solid #eee; justify-content: flex-end; }
  .modal-body
  {position: relative; padding: 20px 10px; overflow-x:auto;}
</style>
