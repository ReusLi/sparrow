import { CellKey, AntdColumn } from 'interface/common'

import { toJS } from "mobx";

class Util {
    syncTableColumns(cellModels: Array<Array<CellKey>>) {
        cellModels = toJS(cellModels)

        cellModels = this.mapCellModels(cellModels)

        let columns: Array<any> = cellModels.shift().filter(cell => !cell.isHide)

        columns = columns.map(col => {
            col = this.findChildren(cellModels, col, 0)
            return col
        })
        columns = this.filterColumnsAttr(columns)
        return columns
    }


    filterColumnsAttr(columns: Array<any>) {
        const tmp = {
            children: columns
        }
        this.mapColums(tmp, (col: any) => {
            delete col.rowSpan
            delete col.colSpan
            delete col.X
            delete col.Y
            delete col.text
            delete col.isHide
            delete col.hasParent
        })
        return columns
    }

    mapCellModels(cellModels: Array<Array<AntdColumn>>) {
        cellModels.map(row => {
            row.map(cell => {
                cell.children = []
                cell.hasParent = false
                cell.title = cell.text
                cell.key = `${cell.X}_${cell.Y}`
            })
        })
        return cellModels
    }

    findChildren(cellModels: Array<Array<AntdColumn>>, col: any, rowIndex: number) {
        if (cellModels.length <= rowIndex)
            return false
        const curRow = cellModels[rowIndex]

        curRow.map(cell => {
            if (!cell.isHide) {
                const minY = col.Y,
                    maxY = col.Y + (col.colSpan - 1);

                if (cell.hasParent === false && minY <= cell.Y && cell.Y <= maxY) {
                    col.children.push(cell)
                    cell.hasParent = true
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

export default new Util()