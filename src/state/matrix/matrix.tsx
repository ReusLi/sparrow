import { computed, observable, action } from "mobx";

import { CellKey, SelectInfo } from 'interface/common'

// utils 
import MatrixUtils from 'utils/matrix.utils'

import util from './util'

class MatrixMobx {
  /**
   * 矩阵行数
   */
  row: number = 10
  /**
   * 矩阵列数
   */
  col: number = 10
  /**
   * mouse down cell
   */
  mouseDownCell: CellKey
  /**
   * mouse up cell
   */
  mouseUpCell: CellKey
  /**
   * 需要合并的单元格
   */
  mergeCellList: Array<CellKey> = []
  /**
   * 需要隐藏的单元格
   */
  hideCellList: Array<CellKey> = []
  /**
   * 矩阵单元格模型
   */
  @observable cellModels: Array<Array<CellKey>> = []

  constructor() {

  }


  @action setCellModels(cellModels: Array<Array<CellKey>>) {
    this.cellModels = cellModels
  }

  /**
   * cell组件触发mouse down事件时, 会通过context通知 matrix组件
   * 记录下mouse down cell信息
   * @param cellKey 
   */
  onCellMouseDown(cellKey: CellKey) {
    this.mouseDownCell = cellKey
  }

  /**
   * cell组件mouse up事件时
   * @param cellKey 
   */
  onCellMouseUp(cellKey: CellKey) {
    // 如果是点击一个单元格 不需要做处理
    if (util.isSameCellKey(this.mouseDownCell, cellKey)) {
      return false;
    }

    this.mouseUpCell = cellKey
    let SelectInfo: SelectInfo = MatrixUtils.buildXY(this.mouseDownCell, this.mouseUpCell)


    let { hideCellList, kc }: { hideCellList: Array<CellKey>, kc: CellKey } = util.getSkipCellByCellKeys(SelectInfo.startCell, SelectInfo.endCell)

    this.mergeCellList.push(kc)
    this.hideCellList = this.hideCellList.concat(hideCellList)
  }

  /**
   * 更新矩阵模型
   */
  updateMatrixModel() {
    const row = this.row,
      col = this.col;

    let cellModels: Array<Array<CellKey>> = util.buildMatrixModel(row, col, this.mergeCellList, this.hideCellList)

    this.cellModels = cellModels
  }

}

export default new MatrixMobx()