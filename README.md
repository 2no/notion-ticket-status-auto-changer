# Notion Ticket Status Auto Changer

チケットのステータスを自動で変更する Google Apps Script

使用するには自前で Notion インテグレーションを用意してデータベースと紐付ける必要があります

## Setup

プロジェクトをクローンし、プロジェクトルートにて以下を実行

1.[clasp](https://github.com/google/clasp) で Google Apps Script のプロジェクトを作成する

```shell
npm ci
npx clasp login
npx clasp create --rootDir ./dist
npm run deploy
```

2.スクリプト プロパティの設定

Google Apps Script の `プロジェクトの設定` -> `スクリプト プロパティ` より以下を設定してください

| プロパティ                                     | 値                     |
|-------------------------------------------|-----------------------|
| NOTION_TOKEN                              | インテグレーションシークレット       |
| NOTION_TICKET_STATUS_PROPERTY             | ステータスのプロパティ名          |
| NOTION_TICKET_STATUS_WILL_CHANGE_TO_VALUE | 変更後のステータス値            |
| NOTION_TICKET_CREATED_TIME_PROPERTY       | 作成日時のプロパティ名           |
| NOTION_TICKET_CREATED_TIME_THRESHOLD      | 変更対象とする作成日時の閾値（マイクロ秒） |
