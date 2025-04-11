import { getCurrent, onOpenUrl } from '@tauri-apps/plugin-deep-link'
import { useRouter } from 'vue-router'

function parseSearchParams(url: string) {
  const searchIndex = url.indexOf('?')
  if (searchIndex === -1) {
    return {}
  }
  const search = url.substring(searchIndex + 1)
  const params = new URLSearchParams(search)
  const result: {
    [key: string]: string
  } = {}
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  return result
}

export const useDeepLink = async () => {
  const router = useRouter()

  const handleUrl = (urlString: string) => {
    console.log(urlString)

    const url = new URL(urlString)

    const isLink = url.pathname.startsWith('/link')

    if (!isLink) {
      return
    }
    const search = parseSearchParams(urlString)
    if (search.actionType == 'taskList') {
      console.log(search.taskListId)
      router.push(`/tasks/${search.taskListId}`)
    }
  }

  console.log('use deep link')

  const urls = await getCurrent()
  console.log('getCurrent', urls)
  // alert(urls)

  urls?.forEach((e) => handleUrl(e))

  await onOpenUrl((urls) => {
    console.log(urls)
    urls?.forEach((e) => handleUrl(e))
  })
}
