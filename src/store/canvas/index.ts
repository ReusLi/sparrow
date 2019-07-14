import { observable, action, observe } from 'mobx';

import mapUtils from "./mapUtils";

class CanvasStore {
    constructor() {

    }
    // 画布当前选择的节点信息
    @observable nodeInfo: any = {
        node: []
    }

    /**
     * 同步节点信息
     */
    @action updateCurNode (domNode: Element) {
        this.nodeInfo.node = domNode
        // mapUtils.mapNode(domNode)
    }

}

const canvasStore = new CanvasStore()




export default canvasStore