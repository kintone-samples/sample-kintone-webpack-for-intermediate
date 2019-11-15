import jQuery from 'jquery';
const events = ['app.record.create.show', 'app.record.edit.show'];
kintone.events.on(events, event => {
  const el = kintone.app.record.getHeaderMenuSpaceElement();
  const hello = 'hello';
  const world = 'world!';
  const message = {
    hello,
    world
  };
  const copied = Object.assign({}, message);
  jQuery(el).append(`<div>${copied.hello} ${copied.world}!</div>`);
});
