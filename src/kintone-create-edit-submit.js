import {isEmpty} from "./empty-validator";

(() => {
    const events = [
        "app.record.create.submit",
        "app.record.edit.submit"
    ];
    kintone.events.on(events, (ev) => {
        if(isEmpty.test(ev.record.文字列__1行_.value)) {
            ev.record.文字列__1行_.error = "必須項目です！";
        }
        return ev;
    });
})();