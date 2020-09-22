declare namespace Kintone.Types {
  interface Product {
    ラジオボタン: kintone.fieldTypes.RadioButton;
    文字列__複数行__0: kintone.fieldTypes.MultiLineText;
    型番: kintone.fieldTypes.SingleLineText;
    商品名: kintone.fieldTypes.SingleLineText;
    数値: kintone.fieldTypes.Number;
    在庫数: kintone.fieldTypes.Number;
  }
  interface SavedProduct extends Product {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
