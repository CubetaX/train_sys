<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <slot name="header">
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button type="submit" class="btn btn-warning" @click="submit">确定</button>
          <button type="submit" class="btn btn-default" @click="close">关闭</button>
        </slot>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "noticeModal",
    methods:{
      close(){
        this.$emit('closeModal')
      },
      submit(){
        this.$emit('closeModal')
        this.$emit('delete')
      }
    }
  }
</script>

<style scoped>.modal-backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,.3); display: flex; justify-content: center; align-items: center; }
.modal {
  margin: 15%; background-color: #fff; box-shadow: 2px 2px 20px 1px; overflow-x:auto; display: flex; flex-direction: column; }
.modal-header, .modal-footer { padding: 15px; display: flex; }
.modal-header { border-bottom: 1px solid #eee; color: #4aae9b; justify-content: space-between; }
.modal-footer { border-top: 1px solid #eee; justify-content: flex-end; }
.modal-body { position: relative; padding: 20px 10px; }
</style>
