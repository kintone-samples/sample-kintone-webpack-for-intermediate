// 電話番号の入力チェック
export const validTel = (record, field_code) => {
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

// 郵便番号の入力をチェック
export const validZip = (record, field_code) => {
  // 郵便番号の定義(7桁の半角数字)
  const zip_pattern = /^\d{7}$/;
  // errorを初期化します
  record[field_code].error = null;

  // 郵便番号 が入力されていたら、定義したパターンにマッチするか確認します
  if (record[field_code].value && !record[field_code].value.match(zip_pattern)) {
    // マッチしない場合は、エラー内容をerrorに入力します
    record[field_code].error = '7桁の半角数字で入力して下さい';
  }
};