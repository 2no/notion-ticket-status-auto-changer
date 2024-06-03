import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

interface NotionClientOptions {
  token: string;
  endpoint?: string;
  notionVersion?: string;
}

interface NotionClientRequestOptions
  extends Omit<URLFetchRequestOptions, 'payload'> {
  data?: unknown;
}

export class NotionClient {
  readonly #token: string;
  readonly #endpoint: string;
  readonly #notionVersion: string;

  static readonly defaultNotionVersion = '2022-06-28';

  constructor(options: NotionClientOptions) {
    this.#token = options.token;
    this.#endpoint = `${options?.endpoint ?? 'https://api.notion.com'}/v1/`;
    this.#notionVersion =
      options?.notionVersion ?? NotionClient.defaultNotionVersion;
  }

  call(path: string, options?: NotionClientRequestOptions) {
    const response = UrlFetchApp.fetch(`${this.#endpoint}${path}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${this.#token}`,
        'Content-Type': 'application/json',
        'Notion-Version': this.#notionVersion,
      },
      payload: options?.data ? JSON.stringify(options.data) : undefined,
    });
    return JSON.parse(response.getContentText());
  }

  get(path: string, options?: Omit<NotionClientRequestOptions, 'method'>) {
    return this.call(path, { ...options, method: 'get' });
  }

  delete(path: string, options?: Omit<NotionClientRequestOptions, 'method'>) {
    return this.call(path, { ...options, method: 'delete' });
  }

  patch(path: string, options?: Omit<NotionClientRequestOptions, 'method'>) {
    return this.call(path, { ...options, method: 'patch' });
  }

  post(path: string, options?: Omit<NotionClientRequestOptions, 'method'>) {
    return this.call(path, { ...options, method: 'post' });
  }

  put(path: string, options?: Omit<NotionClientRequestOptions, 'method'>) {
    return this.call(path, { ...options, method: 'put' });
  }
}
