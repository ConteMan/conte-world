export default new class Memo {
  prefix = '/memos'

  async list(page: Ref<number>, per_page: Ref<number>) {
    const config = useRuntimeConfig()
    return await useFetch<Memo.OriList>(`${config.public.apiUrl}${this.prefix}`, {
      query: {
        page,
        per_page,
      },
    })
  }
}()
