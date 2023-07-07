export default new class Memo {
  prefix = '/memos'

  async list(page: Ref<number>, per_page: Ref<number>) {
    const config = useRuntimeConfig()
    const { data } = await useFetch<Memo.FetchList>(`${config.public.apiUrl}${this.prefix}`, {
      query: {
        page,
        per_page,
      },
    })
    return data
  }
}()
