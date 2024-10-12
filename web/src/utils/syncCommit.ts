import { useCommitsStore } from '@/stores/'

export const useSyncCommit = () => {
  const commitsStore = useCommitsStore()
  console.log(commitsStore)

  console.log(commitsStore.commits)
}
