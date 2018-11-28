import { computed, observable, action, trace } from "mobx";

import matrixStore from 'store/matrix/matrixStore'

class antdTableStore {
    constructor() {

    }

    @observable columns: any = [
        {
            title: '列1',
            dataIndex: 'name',
            key: 'name',
            render: (value: any, row: any, index: any) => {
                console.log(value)
                console.log(row)
                console.log(index)
                const obj = {
                    children: value,
                    props: {
                        colSpan: 1,
                        rowSpan: 2,
                    },
                };
                return obj
            },
            children: [
                {
                    title: 'col-1',
                    dataIndex: '121',
                    key: '12',
                    render: () => {
                        return {
                            props: {
                                colSpan: 1,
                                rowSpan: 1,
                            }
                        }
                    },
                }
            ]
        },
        {
            title: '列2',
            render: () => {
                return {
                    props: {
                        colSpan: 2,
                        rowSpan: 1,
                    }
                }
            },
            children: [
                {
                    title: '列2-1',
                    dataIndex: 'companyAddress',
                    key: 'companyAddress',
                    render: () => {
                        return {
                            props: {
                                colSpan: 1,
                                rowSpan: 1,
                            }
                        }
                    },
                    children: [
                        {
                            title: 'col',
                            dataIndex: '3',
                            key: '3',
                            render: () => {
                                return {
                                    props: {
                                        colSpan: 1,
                                        rowSpan: 1,
                                    }
                                }
                            },
                        }
                    ]
                },
                {
                    title: '列2-2',
                    dataIndex: 'companyName',
                    key: 'companyName',
                    render: () => {
                        return {
                            props: {
                                colSpan: 1,
                                rowSpan: 1,
                            }
                        }
                    },
                    children: [
                        {
                            title: 'col',
                            dataIndex: '4',
                            key: '4',
                            render: () => {
                                return {
                                    props: {
                                        colSpan: 1,
                                        rowSpan: 1,
                                    }
                                }
                            }
                        }
                    ]
                }]
        }]

    @action updateTableCols() {
        let columns: any = matrixStore.cellModels.shift().filter(cell => !cell.isHide)

        matrixStore.cellModels.forEach((row) => {
            row.forEach(cell => {

            });
        })
        this.columns = []
    }
}

export default new antdTableStore()