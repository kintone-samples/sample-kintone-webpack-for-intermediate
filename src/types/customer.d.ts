declare namespace KintoneTypes {
  interface Customer {
    備考: kintone.fieldTypes.MultiLineText;
    郵便番号: kintone.fieldTypes.SingleLineText;
    部署名: kintone.fieldTypes.SingleLineText;
    担当者名: kintone.fieldTypes.SingleLineText;
    メールアドレス: kintone.fieldTypes.SingleLineText;
    顧客ランク: kintone.fieldTypes.DropDown;
    住所: kintone.fieldTypes.SingleLineText;
    TEL: kintone.fieldTypes.SingleLineText;
    FAX: kintone.fieldTypes.SingleLineText;
    会社名: kintone.fieldTypes.SingleLineText;

    会社ロゴ: kintone.fieldTypes.File;
  }
  interface SavedCustomer extends Customer {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
