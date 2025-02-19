<script setup lang="ts">
import { ref } from 'vue'
import './editUserInfo.less'
import uploadIImage from '../../static/upload.png'
import {
  uploadAvatar as uploadAvatarApi,
  editUserInfo as editUserInfoApi
} from '../../apis/editUserinfo'
import Taro from '@tarojs/taro'
import { Input as TInput, Form as TForm } from '@tarojs/components'
import { getUserinfo } from '../../utils/getUserInfo'

defineOptions({
  name: 'editUserInfo'
})

const avatar = ref('')

const uploadAvatar = async (e: {
  detail: {
    avatarUrl: string
  }
}) => {
  const res = await uploadAvatarApi(e.detail.avatarUrl)
  avatar.value = res.data.url
}
const submit = async (e: {
  detail: {
    value: {
      username: string
    }
  }
}) => {
  console.log(e)
  console.log(e.detail.value)

  const username = e.detail.value.username as string

  if (!username) {
    return Taro.showToast({
      title: '请填写用户名',
      icon: 'error'
    })
  }
  if (!avatar.value) {
    return Taro.showToast({
      title: '请选择或上传头像',
      icon: 'error'
    })
  }
  if (username.length > 32) {
    return Taro.showToast({
      title: '用户名过长',
      icon: 'error'
    })
  }

  const res = await editUserInfoApi({
    username,
    avatar: avatar.value
  })
  if (res.status == 200) {
    Taro.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 2000
    })
    await getUserinfo()
    setTimeout(() => {
      Taro.switchTab({
        url: '/pages/my/my'
      })
    }, 1000)
  }
}
</script>

<template>
  <div class="edit-user-info">
    <t-form @submit="submit" class="edit-user-info-form">
      <h3 class="sub_title">用户名</h3>
      <t-input class="username_input" type="nickname" maxLength="32" name="username" />
      <h3 class="sub_title">头像</h3>
      <button class="upload" open-type="chooseAvatar" @chooseavatar="uploadAvatar">
        <image
          v-if="!avatar"
          class="upload-icon"
          :src="uploadIImage"
          mode="aspectFit"
          alt=""
        />
        <image v-else class="avatar" :src="avatar" mode="aspectFit" alt="" />
      </button>
      <button class="submit" form-type="submit">提交</button>
    </t-form>
  </div>
</template>
