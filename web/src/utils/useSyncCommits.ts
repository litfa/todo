import { useCommitsStore } from '@/stores'

export const useSyncCommits = () => {
  const commitsStore = useCommitsStore()

  console.log(commitsStore)

  // setInterval(() => {
  //   const commits = commitsStore.commits.filter((e) => {
  //     return !e.synced
  //   })
  //   console.log(commits)
  // }, 1000)
}
