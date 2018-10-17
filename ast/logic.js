const fs = require('fs')
const path = require('path')

const parse5 = require('parse5')

class tempClass {
    parse(htmlTempalte) {
        const DOM = parse5.parse(htmlTempalte);

        return DOM;
    }

    serialize(DOM) {
        // Serializes the <html> element content.
        const htmlTemplate = parse5.serialize(DOM);

        return htmlTemplate;
    }

    nodeMap(node, callback) {
        node.childNodes.map(child => {
            child = callback(child)
            child.childNodes ? this.nodeMap(child, callback) : null;
            return child;
        })

        return node;
    }

    nodeHandle(node) {
        if (node.tagName && node.tagName === 'div') {
            node = this.modifyStyle(node)
        }
        return node;
    }

    modifyStyle(node) {
        node.attrs.map(attr => {
            if (attr.name === 'style') {
                let styleArr = attr.value.split(';')
                styleArr.push('display: flex')
                attr.value = styleArr.join(';')
            }

            return attr;
        })

        return node;
    }

    /**
     * 测试Parse5模块
     */
    paser5spec() {
        // 先读取文件, 返回文件内容和路径

        // parse5处理文件内容

        // 判断

        //
        const folderpath = path.join(__dirname, 'html')
        const fileList = fs.readdirSync(folderpath)

        fileList.forEach(file => {
            let filepath = path.join(folderpath, file),
                // 文件内容
                fileContent = fs.readFileSync(filepath, 'utf-8'),
                // 文件parse后的数据结构
                fileCst = parse5.parse(fileContent);

            fileCst = this.nodeMap(fileCst, this.nodeHandle.bind(this));
            
            let newFile = parse5.serialize(fileCst),
                newFilePath = path.join(__dirname, 'new.html');

            fs.writeFileSync(newFilePath, newFile, 'utf-8')
        })
        return ;
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

const p5 = new tempClass();

p5.paser5spec()