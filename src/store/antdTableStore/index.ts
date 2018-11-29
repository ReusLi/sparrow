import { computed, observable, action, trace, toJS } from "mobx";

import matrixStore from 'store/matrix/matrixStore'

import { CellKey } from 'interface/common'

class antdTableStore {
    constructor() {

    }

    @observable columns: any = [
        {
            title: '列1',
            dataIndex: 'name',
            key: 'name',
            children: [
                {
                    title: 'col-1',
                    dataIndex: '121',
                    key: '12',
                }
            ]
        },
        {
            title: '列2',
            children: [
                {
                    title: '列2-1',
                    dataIndex: 'companyAddress',
                    key: 'companyAddress',
                    children: [
                        {
                            title: 'col',
                            dataIndex: '3',
                            key: '3',
                        }
                    ]
                },
                {
                    title: '列2-2',
                    dataIndex: 'companyName',
                    key: 'companyName',
                    children: [
                        {
                            title: 'col',
                            dataIndex: '4',
                            key: '4',
                        }
                    ]
                }]
        }]

    /**
     * 同步表格列信息
     */
    @action syncTableColumns() {
        this.columns = []
        const cellModels = toJS(matrixStore.cellModels)
        let columns: Array<any> = cellModels.shift().filter(cell => !cell.isHide)
        columns.map(col => {
            col.children = []
            col = this.cellToCol(col)
        })

        columns = columns.map(col => {
            col = this.findChildren(cellModels, col, 0)
            return col
        })

        columns.map(column => {
            this.mapColums(column, (col: any) => {
                col = this.cellToCol(col)
            })
        })
        console.log(columns)
        this.columns = columns
    }

    cellToCol(cell: CellKey) {
        let col: any = cell

        col.title = cell.text
        col.dataIndex = `${cell.X}_${cell.Y}`
        col.key = `${cell.X}_${cell.Y}`

        return col
    }

    findChildren(cellModels: Array<Array<CellKey>>, col: any, rowIndex: number) {
        if (cellModels.length <= rowIndex)
            return false
        const curRow = cellModels[rowIndex]

        curRow.forEach(cell => {
            if (!cell.isHide) {
                // 
                const minY = col.Y,
                    maxY = col.Y + col.colSpan;
                // 
                if (minY <= cell.Y < maxY) {
                    col.children.push(cell)
                    this.findChildren(cellModels, cell, ++rowIndex)
                }
            }
        })
        return col
    }

    mapColums(columns: any, callback: Function) {
        const children: Array<any> = columns.children

        if (!children)
            return false

        children.map(col => {
            callback(col)
            if (col.children)
                this.mapColums(col.children, callback)
        })
    }
}

export default new antdTableStore()