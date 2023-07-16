export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath === '/wiki')
    return navigateTo('/wiki/intro')
  if (to.fullPath === '/leetcode')
    return navigateTo('/leetcode/intro')
})
