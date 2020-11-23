import {KintoneRestAPIClient, KintoneRecordField} from '@kintone/rest-api-client';

// 製品アプリの型を定義
type SavedProduct = {
  $id: KintoneRecordField.ID;
  $revision: KintoneRecordField.Revision;
  更新者: KintoneRecordField.Modifier;
  作成者: KintoneRecordField.Creator;
  レコード番号: KintoneRecordField.RecordNumber;
  更新日時: KintoneRecordField.UpdatedTime;
  作成日時: KintoneRecordField.CreatedTime;
  ラジオボタン: KintoneRecordField.RadioButton;
  文字列__複数行__0: KintoneRecordField.MultiLineText;
  型番: KintoneRecordField.SingleLineText;
  商品名: KintoneRecordField.SingleLineText;
  数値: KintoneRecordField.Number;
  在庫数: KintoneRecordField.Number;
}

// 商品アプリのアプリIDを入力してください
const productsAppId = 122;

const events = ['app.record.create.submit', 'app.record.edit.submit'];

kintone.events.on(events, async (event) => {
  const record = event.record as KintoneTypes.Quote;

  // kintoneへ接続するためのインスタンスを作成
  const client = new KintoneRestAPIClient({});

  // 今回はコード簡略化のために、テーブルの商品は重複禁止とします。
  // ただの簡易的な重複チェックなので意味は理解しなくてOKです。
  const hasDuplicatedRow = record.見積明細.value.some((rowA, indexA, arr) => {
    return arr.find(
      (rowB, indexB) =>
        indexA !== indexB && rowA.value.型番.value === rowB.value.型番.value
    );
  });
  if (hasDuplicatedRow) {
    event.error = '重複した商品は登録できません。';
    return event;
  }

  // テーブルに入っている商品レコードを取得
  let products;
  try {
    // Genericに型を指定することで, products変数を利用する際に型推論ができる
    products = await client.record.getRecords<SavedProduct>({
      app: productsAppId,
      query: `型番 in (${record.見積明細.value
        .map((row) => `"${row.value.型番.value}"`)
        .join(', ')})`,
    });
  } catch (error) {
    event.error = 'レコードの取得に失敗しました';
    return event;
  }

  // 商品リストの在庫数を差し引いたデータを作成
  const deductedProductRecords = products.records.map((productRecord) => {
    const tableRow = record.見積明細.value.find(
      (row) => productRecord.型番.value === row.value.型番.value
    );

    // アップデートのキーとなる型番と, 差し引いた在庫数を格納する。
    return {
      型番: {
        value: productRecord.型番.value,
      },
      在庫数: {
        value:
          Number(productRecord.在庫数.value) -
          Number(tableRow?.value.数量.value),
      },
    };
  });

  // 在庫数を差し引いたあと在庫数が0未満になるようなレコードがないか確認
  const noStockRecords = deductedProductRecords.filter(
    (productRecord) => Number(productRecord.在庫数.value) < 0
  );

  // 差し引き1未満のレコードがでた場合はエラーとみなしレコードの作成をストップさせる
  if (noStockRecords.length > 0) {
    // event.errorにデータをいれたあとeventを返すとレコードの作成をストップできる
    // どの商品が問題か示すために在庫が足りない商品の型番を列挙する
    event.error = `在庫がない商品があります。型番 ${noStockRecords
      .map((productRecord) => productRecord.型番.value)
      .join(', ')}`;

    return event;
  }

  // 問題なければアップデート
  try {
    await client.record.updateRecords({
      app: productsAppId,
      records: deductedProductRecords.map((productRecord) => {
        return {
          updateKey: {
            field: '型番',
            value: productRecord.型番.value,
          },
          record: {
            在庫数: {
              value: productRecord.在庫数.value,
            },
          },
        };
      }),
    });
  } catch (error) {
    event.error = `アップデートに失敗しました。${error.message}`;
    return event;
  }

  return event;
});
