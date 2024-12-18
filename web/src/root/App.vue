<script setup lang="ts">
import themes from '@/assets/theme'
import { useThemes } from '@/utils/theme'
import { injectionKey } from '@/types/'

const { theme, mode } = useThemes(themes)

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
