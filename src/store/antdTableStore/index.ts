import { computed, observable, action, trace, toJS } from "mobx";

import matrixStore from 'store/matrix/matrixStore'

import { CellKey } from 'interface/common'

class antdTableStore {
    constructor() {

    }

    @observable columns: any = [
        {
            title: '列1',
            key: '1',
            children: [
                {
                    title: '列4',
                    key: '4',
                }
            ]
        },
        {
            title: '列2',
            key: '2',
            children: [
                {
                    title: '列5',
                    key: '5'
                }]
        },
        {
            title: '列3',
            key: '3',
            children: [
                {
                    title: '列6',
                    key: '6'
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
                const isZero = cell.Y === 0 && col.Y === 0
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