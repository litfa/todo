<script setup lang="ts">
defineOptions({
  name: 'TaskListItem'
})

const checked = ref(false)
</script>

<template>
  <div class="task-list-item">
    <a-radio v-model:checked="checked"></a-radio>
    <div class="info">
      <div class="title">吃饭</div>
      <div class="desc">第0步，共1步</div>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.task-list-item {
  background-color: pink;
  margin: 8px;
  border-radius: 5px;
  display: flex;
  padding: 8px;
  align-items: flex-start;
  .info {
    .desc {
      font-size: 12px;
    }
  }
  .right {
    margin-left: auto;
  }
}
</style>
