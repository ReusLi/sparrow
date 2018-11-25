import { computed, observable, action, trace } from "mobx";

import { CellKey, SelectInfo } from 'interface/common'

// utils 
import MatrixUtils from 'utils/matrix.utils'

import util from './util'

// matrixStore mobx
import cellStore from 'store/cell/cellStore'

class matrixStore {
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
  // @observable hideCellList: Array<CellKey> = []
  /**
   * 矩阵单元格模型
   */
  @observable cellModels: Array<Array<CellKey>> = []

  @observable testV: string = ''
  
  constructor() {

  }

  @action updateTestV(value: string) {
    this.testV  = value
  }

  // @computed get hideCellList() { 
  //   return this.hideCellList
  // }

  @action setCellModels(cellModels: Array<Array<CellKey>>) {
    this.cellModels = cellModels
  }

  /**
   * 根据cellStore 的 selectInfo (选择的单元格范围)
   * 更新cell list
   * 包括 hide cell list 和 merge cell list
   */
  updateCellList(selectInfo: SelectInfo) {
    const mouseDownCell = selectInfo.startCell,
      mouseUpCell = selectInfo.endCell

    let SelectInfo: SelectInfo = MatrixUtils.buildXY(mouseDownCell, mouseUpCell)

    return util.mergeCells(this.cellModels, SelectInfo)
  }

  /**
   * 初始化n*n的数据模型
   */
  initMatrixModel() {
    const row = this.row
    const col = this.col

    let cellModels: Array<Array<CellKey>> = util.buildMatrixModel(row, col, [], [])

    this.cellModels = cellModels
  }

  /**
   * 更新矩阵模型
   */
  updateMatrixModel() {
    if (util.isIllegalCell(cellStore.selectInfo))
      return

    this.cellModels = this.updateCellList(cellStore.selectInfo)
  }
  /**
  * 更新矩阵模型
  */
  mergeCells() {
    let selectInfo = cellStore.selectInfo
    if (util.isIllegalCell(selectInfo))
      return

    const mouseDownCell = selectInfo.startCell,
      mouseUpCell = selectInfo.endCell

    selectInfo = MatrixUtils.buildXY(mouseDownCell, mouseUpCell)

    this.cellModels = util.mergeCells(this.cellModels, selectInfo)
  }

  disMergeCell() {
    let selectInfo = cellStore.selectInfo

    this.cellModels = util.disMergeCell(this.cellModels, selectInfo)
    // console.log(toJS(this.cellModels))
  }

}

export default new matrixStore()