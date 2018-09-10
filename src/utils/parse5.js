import parse5 from 'parse5'

export default class Parse5 {
    parse(htmlTempalte) {
        const DOM = parse5.parse(htmlTempalte);

        return DOM;
    }

    serialize(DOM) {
        // Serializes the <html> element content.
        const htmlTemplate = parse5.serialize(DOM);

        return htmlTemplate;
    }

    /**
     * 测试Parse5模块
     */
    paser5spec() {
        let cls = new Parse5()

        // 获取dom的树结构
        let r1 = cls.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>')

        // 替换树结构属性, 在Body标签上新增属性
        r1.childNodes[1].childNodes[1].attrs = [
            {
                name: "data-at",
                value: "bd"
            },
            {
                name: "style",
                value: "color: red"
            }
        ]

        // 序列号
        let r2 = cls.serialize(r1)

        // 输出
        console.log(r1)
        console.log(r2)
    }
}