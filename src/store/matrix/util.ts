import { CellKey } from 'interface/common'

import { SelectInfo } from 'table/interface'

// utils 
import MatrixUtils from 'utils/matrix.utils'
import { debug } from 'util';

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
        let cellModel: CellKey

        for (let i = 0; i < row; i++) {
            matrixModel.push([])
            for (let j = 0; j < col; j++) {
                cellModel = {
                    X: i,
                    Y: j,
                    rowSpan: 1,
                    colSpan: 1,
                    text: `(${i}, ${j})`
                }

                // 判断是否是no use cell, 如果是, 不需要push进matrixModel
                let isHideCell = hideCellList.some(cell => cell.X === cellModel.X && cell.Y === cellModel.Y)

                isHideCell ? null : matrixModel[i].push(cellModel)
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
     * 检查单元格合法性
     */
    isIllegalCell(selectInfo: SelectInfo) {
        const mouseDownCell = selectInfo.startCell,
            mouseUpCell = selectInfo.endCell

        // 判断mouse down 和 mouse up是不是同一个单元格
        return this.isSameCellKey(mouseDownCell, mouseUpCell)
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
     * 根据选择区域, 合并单元格
     * @param cellModels 
     * @param selectInfo 
     */
    mergeCellBySelectInfo(cellModels: Array<Array<CellKey>>, selectInfo: SelectInfo) {
        let xLen: number = cellModels.length,
            yLen: number = cellModels[0].length;

        for (let i = 0; i < xLen; i++) {
            for (let j = 0; j < yLen; j++) {
                let cell: CellKey = cellModels[i][j]

                // 判断是否在隐藏区域范围内
                if (MatrixUtils.isInSideCell(selectInfo, cell)) {
                    cell.isHide = true
                }
            }
        }
        // 解放左上角的单元格
        let firstCell =  cellModels[selectInfo.startCell.X][selectInfo.startCell.Y]
        firstCell.rowSpan = selectInfo.endCell.X - selectInfo.startCell.X + 1
        firstCell.colSpan = selectInfo.endCell.Y - selectInfo.startCell.Y + 1
        firstCell.isHide = false
        return cellModels
    }
}

export default new Util()