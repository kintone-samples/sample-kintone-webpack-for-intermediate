import appIds from '../../common/app_ids'; // ExportされたものはImportで利用できる
const events = ['app.record.create.show', 'app.record.edit.show'];
kintone.events.on(events, async event => {
  // app_idsで定義された定数が利用できる
  console.log(appIds.app3);

  // このようにAPIを利用するときにも使える
  // アプリIDが1のレコードを取得
  const resp = await kintone
    .api(kintone.api.url('/k/v1/records', true), 'GET', {app: appIds.app1});
  console.log(resp);

  // アプリIDが2のレコードを取得
  const resp1 = await kintone
    .api(kintone.api.url('/k/v1/records', true), 'GET', {app: appIds.app2});
  console.log(resp1);
});
