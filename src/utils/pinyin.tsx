const pinyin = require('pinyin');

export default {
    transfrom(chart: string) {
        return pinyin(chart, {
            // 设置拼音风格, 返回首字母
            style: pinyin.STYLE_FIRST_LETTER,
        }).join('');
    }
}