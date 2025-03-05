import { reactive, watch } from 'vue'

class A {
  arr: number[]
  constructor(arr: number[]) {
    this.arr = arr
    this.setArr()
  }
  setArr() {
    this.arr.splice(0, Infinity, ...[])
  }
  add(num: number) {
    this.arr.push(num)
  }
}

const arr = reactive([])

watch(
  arr,
  (a, b) => {
    console.log('watch', a, b)
  },
  {
    deep: true
  }
)

const a = new A(arr)

setTimeout(() => {
  a.add(1)
  a.add(2)
  a.add(3)
}, 2000)

setTimeout(() => {
  a.add(4)
}, 3000)
