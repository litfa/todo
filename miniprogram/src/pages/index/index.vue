<template>
  <view class="index">
    <Counter />
  </view>
</template>

<script>
import './index.less'
import Counter from '../../components/Counter.vue'

export default {
  name: 'IndexPage',
  components: {
    Counter
  }
}
</script>
