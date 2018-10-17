const fs = require('fs')
const path = require('path')

const parse5 = require('parse5')

class tempClass {
    /**
     * 把字符串变成数据结构
     * @param {*} htmlTempalte 
     */
    parse(htmlTempalte) {
        const DOM = parse5.parse(htmlTempalte);

        return DOM;
    }

    /**
     * 把数据结构变成字符串
     * @param {*} DOM 
     */
    serialize(DOM) {
        // Serializes the <html> element content.
        const htmlTemplate = parse5.serialize(DOM);

        return htmlTemplate;
    }

    /**
     * 遍历节点
     * @param {*} node 
     * @param {*} callback 
     */
    nodeMap(node, callback) {
        node.childNodes.map(child => {
            child = callback(child)
            child.childNodes ? this.nodeMap(child, callback) : null;
            return child;
        })

        return node;
    }

    /**
     * 处理标签节点
     * @param {*} node 
     */
    nodeHandle(node) {
        if (node.tagName) {
            node = this.modifyStyle(node)
        }
        return node;
    }

    /**
     * 把所有标签加上 style="display: flex"
     * @param {*} node 
     */
    modifyStyle(node) {
        let hasStyleAttr = false;
        node.attrs.map(attr => {
            if (attr.name === 'style') {
                hasStyleAttr = true;

                let styleArr = attr.value.split(';')
                styleArr.push('display: flex')
                attr.value = styleArr.join(';')
            }

            return attr;
        })

        if (node.attrs.length === 0 || !hasStyleAttr) {
            node.attrs.push({
                name: 'style',
                value: 'display: flex'
            })
        }

        return node;
    }

    /**
     * 测试Parse5模块
     */
    paser5spec() {
        const folderpath = path.join(__dirname, 'html')
        const fileList = fs.readdirSync(folderpath)

        // 先读取文件, 返回文件内容和路径
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
    }
}

const p5 = new tempClass();

p5.paser5spec()