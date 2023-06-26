export function useScreenSize() {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const isMediumScreen = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isSmallScreen = useMediaQuery('(max-width: 767px)')
  return {
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  }
}
