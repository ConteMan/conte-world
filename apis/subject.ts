import type { SubjectStatuses, SubjectTypes } from '~/constants'

export default new class Subjects {
  prefix = '/subjects'

  async list(page: Ref<number>, per_page: Ref<number>, type: Ref<SubjectTypes>, status: Ref<SubjectStatuses>) {
    const config = useRuntimeConfig()
    const { data } = await useFetch<Subject.FetchList>(`${config.public.apiUrl}${this.prefix}`, {
      query: {
        page,
        per_page,
        type,
        status,
      },
    })
    return data
  }
}()
