import { CellKey } from 'interface/common'

class Util {
    
    /**
     * 构建n*n的矩阵数据模型
     * @param row 
     * @param col 
     * @param mergeCellList 
     * @param hideCellList 
     */
    buildMatrixModel(row: number, col: number, mergeCellList: Array<CellKey>, hideCellList: Array<CellKey>) {
        let matrixModel: Array<Array<CellKey>> = []

        // 获取matrixModel, 且model会满足:
        // 1. 所有的cell rowspan colspan都是1
        // 2. 不包含隐藏的cell
        matrixModel = this.buildMatrixNormalCell(row, col, matrixModel, hideCellList)

        // 按照megeCellList, 把对应的cell设置rowspan colspan
        matrixModel = this.buildMatrixMergeCell(matrixModel, mergeCellList)

        return matrixModel;
    }

    /**
     * 这一步是构建矩阵
     * 矩阵里面的单元格, 是不包括隐藏单元格的
     * 也就是如果有合并单元格的话, 这个矩阵构建出来的格数是 < n*n的
     * 但是这一步构建完成后, 所有的cell的rowspan colspan都还是1
     * 
     * @param row 
     * @param col 
     * @param matrixModel 
     * @param hideCellList 
     */
    buildMatrixNormalCell(row: number, col: number, matrixModel: Array<Array<CellKey>>, hideCellList: Array<CellKey>) {
        let cellKey: CellKey

        for (let i = 0; i < row; i++) {
            matrixModel.push([])
            for (let j = 0; j < col; j++) {
                cellKey = { X: i, Y: j }

                // 判断是否是no use cell, 如果是, 不需要push进matrixModel
                let isHideCell = hideCellList.some(cell => cell.X === cellKey.X && cell.Y === cellKey.Y)

                isHideCell ? null : matrixModel[i].push(cellKey)
            }
        }
        return matrixModel;
    }

    /**
     * 按照merge cell list
     * 把合并的单元格的 rowspan colspan的值作对应修改
     * 
     * @param matrixModel 
     * @param mergeCellList 
     */
    buildMatrixMergeCell(matrixModel: Array<Array<CellKey>>, mergeCellList: Array<CellKey>) {
        mergeCellList.forEach(cell => {
            matrixModel[cell.X].forEach((rowitem, rowindex) => {
                if (rowitem.Y === cell.Y) {
                    matrixModel[cell.X][rowindex] = cell;
                }
            })
        })
        return matrixModel;
    }

    /**
     * no comment
     * @param ck1 
     * @param ck2 
     */
    isSameCellKey(ck1: CellKey, ck2: CellKey) {
        return ck1.X === ck2.X && ck1.Y === ck2.Y;
    }

    /**
     * no comment
     * @param leftTopKey 
     * @param rightBottomKey 
     */
    getSkipCellByCellKeys(leftTopKey: CellKey, rightBottomKey: CellKey) {
        let xLen: number = rightBottomKey.X - leftTopKey.X + 1,
            yLen: number = rightBottomKey.Y - leftTopKey.Y + 1,
            hideCellList: Array<CellKey> = [];

        for (let X = leftTopKey.X, i = 0; i < xLen; i++) {
            for (let Y = leftTopKey.Y, j = 0; j < yLen; j++) {
                hideCellList.push({
                    X: X + i,
                    Y: Y + j
                })
            }

        }
        // 左上角的点是用来构造colspan rowspan的, 应该shift掉
        let kc: CellKey = hideCellList.shift()
        kc.rowSpan = xLen
        kc.colSpan = yLen

        return {
            hideCellList: hideCellList,
            kc: kc
        }
    }
}

export default new Util()