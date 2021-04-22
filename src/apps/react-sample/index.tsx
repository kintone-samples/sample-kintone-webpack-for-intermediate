import React from 'react';
import ReactDOM from 'react-dom';

kintone.events.on('app.record.index.show', async () => {
  const Component = () => <div>test</div>;
  const targetEl = document.querySelector('#target');

  if (targetEl == null) return;
  ReactDOM.render(<Component />, targetEl);
});