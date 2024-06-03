## セットアップ

プロジェクトルートにて以下を実行

```shell
npm ci
```

#### Clasp のインストール

必要に応じて [clasp](https://github.com/google/clasp) をインストールしてください

```shell
npm i -g @google/clasp
```

## 設定

### スクリプトプロパティ

GAS の `プロジェクトの設定` -> `スクリプト プロパティ` より以下を設定してください

| プロパティ                                     | 値                     |
|-------------------------------------------|-----------------------|
| NOTION_TOKEN                              | インテグレーションシークレット       |
| NOTION_TICKET_STATUS_PROPERTY             | ステータスのプロパティ名          |
| NOTION_TICKET_STATUS_WILL_CHANGE_TO_VALUE | 変更後のステータス値            |
| NOTION_TICKET_CREATED_TIME_PROPERTY       | 作成日時のプロパティ名           |
| NOTION_TICKET_CREATED_TIME_THRESHOLD      | 変更対象とする作成日時の閾値（マイクロ秒） |
