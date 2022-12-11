declare namespace Article {
  type Status = 0 | 1;

  /** 列表项 */
  interface ListItem {
    id: string;
    slug: string;
    title: string;
    content: string;
    content_html?: string;
    info_at: string;
    created_at: string;
    updated_at: string;
    status: number;
    is_public: number;
  }
  /** 列表 */
  interface List {
    page: number;
    per_page: number;
    total: number;
    has_more: boolean;
    items: ListItem[];
  }
  /** 列表请求参数 */
  interface ListParams {
    page: number;
    per_page: number;
    status?: number;
    is_public?: number;
  }

  /** 文章详情 */
  type Detail = ListItem;

  /** 新增文章所需数据 */
  type AddData = Pick<ListItem, 'title' | 'content'>;

  /** 新增文章返回结果 */
  type AddDataResponse = ListItem;

  /** 文章更新数据 */
  type PatchData = Partial<Pick<ListItem, 'title' | 'content' | 'status' | 'is_public'>>;

  /** 更新文章返回结果 */
  type PatchDataResponse = [number];
}
