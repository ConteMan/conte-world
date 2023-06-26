export function useDrawerNav(to: string) {
  const systemStore = useSystemStore()
  systemStore.toggleNavDrawer(false)
  const router = useRouter()
  router.push(to)
}
