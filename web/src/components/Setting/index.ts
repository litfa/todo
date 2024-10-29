import { Modal } from 'ant-design-vue'
import SettingContent from './SettingContent.vue'
import './settingModal.less'

const openSettingModal = () => {
  const modal = Modal.info({
    title: '设置',
    wrapClassName: 'setting-modal',
    content: h(SettingContent),
    icon: null,
    footer: null,
    closable: true,
    width: '800px',
    onOk() {
      console.log('ok')
    }
  })

  const destroy = modal.destroy

  return destroy
}

/**
 * setting
 * web/android 使用弹窗
 * win考虑使用弹出窗口
 */
export const openSettingWindow = () => {
  console.log(111)

  const destroy = openSettingModal()

  return {
    destroy: destroy
  }
}
