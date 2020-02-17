// 変更イベント(電話番号)
kintone.events.on(['app.record.create.change.TEL',
  'app.record.edit.change.TEL',
  'app.record.index.edit.change.TEL'], event => {
  validTel(event.record, 'TEL');
  return event;
});

// 保存時のイベント
kintone.events.on(['app.record.create.submit',
  'app.record.edit.submit',
  'app.record.index.edit.submit'], event => {
  validTel(event.record, 'TEL');
  return event;
});

// 電話番号の入力チェック
const validTel = (record, field_code) => {
  // TELの定義(10桁または 11桁の半角数字)
  const tel_pattern = /^\d{10,11}$/;
  // errorを初期化します
  record[field_code].error = null;

  // TEL が入力されていたら、定義したパターンにマッチするか確認します
  if (record[field_code].value && !record[field_code].value.match(tel_pattern)) {
    // マッチしない場合は、エラー内容をerrorに入力します
    record[field_code].error = '10桁 または 11桁の半角数字で入力して下さい';
  }
};