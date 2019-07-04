import { computed, observable, action, trace, toJS } from 'mobx';


class canvasStore {
    constructor() {

    }
    // 画布当前选择的节点
    @observable curNode: any = null

    /**
     * 同步节点信息
     */
    @action updateCurNode(curNode: any) {
        this.curNode = curNode
    }
}

export default new canvasStore()