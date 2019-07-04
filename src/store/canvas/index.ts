import { computed, observable, action, trace, toJS } from 'mobx';


class canvasStore {
    constructor() {

    }

    @observable curNode: any = null

    /**
     * 同步表格列信息
     */
    @action UPDATE_CURNODE(curNode: any) {
        this.curNode = curNode
    }
}

export default new canvasStore()