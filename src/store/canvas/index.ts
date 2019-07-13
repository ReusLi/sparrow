import { observable, action, observe } from 'mobx';


class CanvasStore {
    constructor() {

    }
    // 画布当前选择的节点信息
    @observable nodeInfo: any = {
        node: {}
    }

    /**
     * 同步节点信息
     */
    @action updateCurNode (domNode: any) {
        this.nodeInfo.node = domNode
    }

}

const canvasStore = new CanvasStore()

/**
 * 监听nodeInfo
 */
observe(canvasStore.nodeInfo, change => {
    // 递归遍历所有带 data-candrop="rect" 的标签
    let dom = change.newValue
    
    return undefined
})


export default canvasStore