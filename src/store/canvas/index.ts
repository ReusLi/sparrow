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
    @action updateCurNode (curNode: any) {
        this.nodeInfo.node = curNode
    }

}

const canvasStore = new CanvasStore()

/**
 * 监听nodeInfo
 */
observe(canvasStore.nodeInfo, change => {
    return undefined
})


export default canvasStore