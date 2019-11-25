import appIds from '../../common/app_ids'; // ExportされたものはImportで利用できる
const events = ['app.record.create.show', 'app.record.edit.show'];
kintone.events.on(events, event => {
  // app_idsで定義された定数が利用できる
  console.log(appIds.app3);

  // このようにAPIを利用するときにも使える
  // アプリIDが1のレコードを取得
  kintone
    .api(kintone.api.url('/k/v1/records', true), 'GET', {app: appIds.app1})
    .then(resp => {
      // 結果表示
      console.log(resp);
    });

  // アプリIDが2のレコードを取得
  kintone
    .api(kintone.api.url('/k/v1/records', true), 'GET', {app: appIds.app2})
    .then(resp => {
      // 結果表示
      console.log(resp);
    });
});
