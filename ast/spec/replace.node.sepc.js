const fs = require('fs')
const path = require('path')

const UTIL = require('../util/utils')

class Spec {
    constructor() {
        this.NEW_FILE = fs.readFileSync(path.join(__dirname, './html/new.html'), 'utf-8')
        this.OLD_FILE = fs.readFileSync(path.join(__dirname, './html/old.html'), 'utf-8')

        this.PAGE_FILE = fs.readFileSync(path.join(__dirname, './html/page.html'), 'utf-8')
    }

    diff() {
        let newCst = UTIL.parseFragment(this.NEW_FILE)
        let oldCst = UTIL.parseFragment(this.OLD_FILE)

        this.mergeDiff(newCst, oldCst)

        const oldToNew = UTIL.serialize(oldCst)

        const outputpath = path.join(__dirname, './html/oldtonew.html')

        if (fs.existsSync(outputpath)) {
            fs.unlinkSync(outputpath)
        }

        fs.writeFileSync(outputpath, oldToNew, 'utf-8')
    }

    mergeDiff(newCst, oldCst) {
        this.mapDoubleNode(newCst, oldCst)
    }

    mapDoubleNode(newNode, oldNode) {
        const newNodeChildren = Array.isArray(newNode)
            ? newNode
            : newNode.childNodes

        const oldNodeChildren = Array.isArray(oldNode)
            ? oldNode
            : oldNode.childNodes

        if (!newNodeChildren) return;

        newNodeChildren.forEach((child, index) => {
            let newChild = newNodeChildren[index],
                oldChild = oldNodeChildren[index];

            console.log(newChild)
            console.log(oldChild)
            console.log('======================================')
            try {
                if (typeof oldChild === 'undefined') {
                    oldNodeChildren[index] = oldChild = newChild;
                }
                if (newChild.tagName !== oldChild.tagName) {
                    oldChild.tagName = newChild.tagName
                    oldChild.nodeName = newChild.nodeName
                    oldChild.attrs = newChild.attrs
                    oldChild.childNodes = newChild.childNodes
                }
            } catch (e) {
                debugger
            }
            this.mapDoubleNode(newChild, oldChild)
        })
    }
}

const spec = new Spec();
spec.diff()