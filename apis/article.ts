export default new class Article {
  prefix = '/articles'

  async list(): Promise<Article.List> {
    const res = await useHttp(`${this.prefix}`)
    return res.data ?? {}
  }

  async view(slug: string): Promise<Article.viewItem> {
    const res = await useHttp(`${this.prefix}/${slug}`)
    return res.data ?? {}
  }
}()
