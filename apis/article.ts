export default new class Article {
  prefix = '/articles'

  async list(): Promise<Article.List> {
    const res = await useHttp(`${this.prefix}`)
    return res.data ?? {}
  }

  async view(id: number): Promise<Article.viewItem> {
    const res = await useHttp(`${this.prefix}/${id}`)
    return res.data ?? {}
  }
}()
