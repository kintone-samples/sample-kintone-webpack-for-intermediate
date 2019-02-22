import moji from 'moji';
export const zenkakuToHankaku = (value) => moji(value).convert('ZE', 'HE').toString();