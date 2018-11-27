import { computed, observable, action, trace } from "mobx";

import matrixStore from 'store/matrix/matrixStore'

class antdTableStore {
    constructor() {

    }

    @observable columns: any = [
        {
            title: '列1',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '列2',
            children: [
                {
                    title: '列2-1',
                    dataIndex: 'companyAddress',
                    key: 'companyAddress'
                },
                {
                    title: '列2-2',
                    dataIndex: 'companyName',
                    key: 'companyName'
                }]
        }]

    @action updateTableCols() {
        this.columns = []
    }
}

export default new antdTableStore()