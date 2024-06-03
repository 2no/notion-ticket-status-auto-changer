import { NotionClient } from '~/lib/notion';

global.main = () => {
  const properties = PropertiesService.getScriptProperties().getProperties();
  const notionToken = properties.NOTION_TOKEN;
  const notionClient = new NotionClient({ token: notionToken });

  // ステータスプロパティ名
  const statusProperty = properties.NOTION_TICKET_STATUS_PROPERTY;

  // ステータスの変更後の値
  const statusWillChangeToValue =
    properties.NOTION_TICKET_STATUS_WILL_CHANGE_TO_VALUE;

  // 作成日時プロパティ名
  const createdTimeProperty = properties.NOTION_TICKET_CREATED_TIME_PROPERTY;

  // 作成日時の閾値（マイクロ秒）
  // 数値ではない、または 0 未満の場合は 0 となる
  let createdTimeThreshold = Number(
    properties.NOTION_TICKET_CREATED_TIME_THRESHOLD,
  );
  if (Number.isNaN(createdTimeThreshold) || createdTimeThreshold < 0) {
    createdTimeThreshold = 0;
  }

  // データベースの検索
  const databaseIds = notionClient
    .post('search', {
      data: {
        filter: {
          property: 'object',
          value: 'database',
        },
      },
    })
    .results.map(({ id }: { id: string }) => id);

  for (const databaseId of databaseIds) {
    // チケットの検索
    const pages = notionClient.post(`databases/${databaseId}/query`, {
      data: {
        filter: {
          and: [
            {
              property: statusProperty,
              status: {
                is_empty: true,
              },
            },
            {
              property: createdTimeProperty,
              date: {
                before: new Date(
                  new Date().getTime() - createdTimeThreshold,
                ).toISOString(),
              },
            },
          ],
        },
      },
    }).results;

    for (const page of pages) {
      // チケットのステータスを更新
      notionClient.patch(`pages/${page.id}`, {
        data: {
          properties: {
            [statusProperty]: {
              status: {
                name: statusWillChangeToValue,
              },
            },
          },
        },
      });

      Logger.log(`Updated page: ${page.url}`);

      Utilities.sleep(100);
    }

    Utilities.sleep(100);
  }
};
