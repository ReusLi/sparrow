import { computed, observable, action } from "mobx"

import { CellKey, SelectInfo } from 'interface/common'

import util from "./util";

// utils
import MatrixUtils from 'utils/matrix.utils'
import Cell from "components/cell/cell";

class cellStore {
    isEditable: boolean = true
    
    isMouseDown: boolean = false

    @observable selectInfo: SelectInfo = {
        startCell: {
            X: -1,
            Y: -1
        },
        endCell: {
            X: -1,
            Y: -1
        }
    }

    mouseDownPoint: CellKey

    theLastMouseOverCell: CellKey

    @action onMouseUp(cellKey: CellKey) {
        this.updateCurKeyRand(cellKey)
        this.isMouseDown = false
    }

    @action onMouseDown(cellKey: CellKey) {
        this.selectInfo = {
            startCell: {
                X: cellKey.X,
                Y: cellKey.Y
            },
            endCell: {
                X: cellKey.X,
                Y: cellKey.Y
            }
        }

        this.mouseDownPoint = {
            X: cellKey.X,
            Y: cellKey.Y
        }

        this.isMouseDown = true
    }

    @action onMouseOver(cellKey: CellKey) {
        if (!this.isMouseDown) {
            return false
        }
        // 记录最后一个mouse over的cell, 用于onMouseLeaveTable方法
        this.theLastMouseOverCell = cellKey
        this.updateCurKeyRand(cellKey)
    }

    /**
     * 更新坐标范围
     * @param cellKey 
     */
    updateCurKeyRand(cellKey: CellKey) {
        this.selectInfo = util.updateCurKeyRand(cellKey, this.mouseDownPoint)
    }


}

export default new cellStore()