export interface ResOptions<T> {
  code?: number
  message?: string
  data: T
}

export async function useHttp(url: string) {
  const config = useRuntimeConfig()
  const { data, error } = await useFetch(`${config.public.apiUrl}${url}`)
  return data.value as ResOptions<any>
}