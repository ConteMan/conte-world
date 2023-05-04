const workerApiUrl = import.meta.env.VITE_API ?? false

/**
 * 获取文章列表
 */
export async function fetchArticleList() {
  const res: Article.List | null = await fetch(`${workerApiUrl}/articles`, {
    mode: 'cors',
    credentials: 'omit',
  }).then(async (response) => {
    const res = await response.json()
    return res.data ?? null
  })
  return res
}

/**
 * 获取文章详情
 */
export async function fetchArticle(id: number) {
  const res: Article.Detail | null = await fetch(`${workerApiUrl}/articles/${id}`, {
    mode: 'cors',
    credentials: 'omit',
  }).then(async (response) => {
    const res = await response.json()
    return res.data ?? null
  })
  return res
}
