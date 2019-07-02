import { computed, observable, action, trace, toJS } from 'mobx';


class antdTableStore {
    constructor() {

    }

    @observable columns: any = []

    /**
     * 同步表格列信息
     */
    @action syncTableColumns(columns: any) {
        this.columns = columns
    }
}

export default new antdTableStore()