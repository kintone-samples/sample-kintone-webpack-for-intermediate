import {validTel, validZip} from '../../common/validations';
// 変更イベント(電話番号)
kintone.events.on(['app.record.create.change.TEL',
  'app.record.edit.change.TEL',
  'app.record.index.edit.change.TEL'], event => {
  validTel(event.record, 'TEL');
  return event;
});

// 変更イベント(郵便番号)
kintone.events.on(['app.record.create.change.ZIP',
  'app.record.edit.change.ZIP',
  'app.record.index.edit.change.ZIP'], event => {
  validZip(event.record, 'ZIP');
  return event;
});

// 保存時のイベント
kintone.events.on(['app.record.create.submit',
  'app.record.edit.submit',
  'app.record.index.edit.submit'], event => {
  validTel(event.record, 'TEL');
  validZip(event.record, 'ZIP');
  return event;
});