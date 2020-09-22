declare namespace Kintone.Types {
  interface Quote {
    No: kintone.fieldTypes.SingleLineText;
    文字列__1行_: kintone.fieldTypes.SingleLineText;
    文字列__複数行_: kintone.fieldTypes.MultiLineText;
    日付: kintone.fieldTypes.Date;
    合計金額: kintone.fieldTypes.Calc;
    見積明細: {
      type: "SUBTABLE";
      value: {
        id: string;
        value: {
          単価: kintone.fieldTypes.Number;
          数量: kintone.fieldTypes.Number;
          型番: kintone.fieldTypes.SingleLineText;
          商品名: kintone.fieldTypes.SingleLineText;
          小計: kintone.fieldTypes.Calc;
        };
      }[];
    };
  }
  interface SavedQuote extends Quote {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
