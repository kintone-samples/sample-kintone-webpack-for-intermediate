import {zenkakuToHankaku} from "./hankaku";

(() => {
    const events = [
        "app.record.create.submit",
        "app.record.edit.submit"
    ];
    kintone.events.on(events, (ev) => {
        if(ev.record.文字列__1行_.value) {
            ev.record.文字列__1行_.value = zenkakuToHankaku(ev.record.文字列__1行_.value);
        }
        return ev;
    });
})();