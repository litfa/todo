<script setup lang="ts">
import themes from '@/assets/theme'
import { useUserSetting } from '@/stores'
import { injectionKey } from '@/types/'
import { useThemes } from '@/utils/theme'
import { useI18n } from 'vue-i18n'
import { useDeepLink } from '@/utils/useDeepLink'

const i18n = useI18n()

const { theme, mode } = useThemes(themes)

const userSetting = useUserSetting()
const lang = userSetting.getSettingItem('more', 'lang')

useDeepLink()

watch(
  () => lang.value,
  () => {
    console.log('lang', lang, lang.value)
    i18n.locale.value = lang.value
  },
  {
    immediate: true
  }
)

provide(injectionKey.themeMode, mode)
</script>

<template>
  <!-- <button @click="syncCommitsService.sync()">sync</button> -->
  <!-- <button
    @click="
      notificationService.createTauriNotificationWindow({
        id: 'p00dnrafdqtd',
        time: 0,
        title: ''
      })
    "
    v-if="$route.path != '/notification'"
  >
    open notification
  </button> -->
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: theme.primary
      }
    }"
  >
    <RouterView />
  </a-config-provider>
</template>
