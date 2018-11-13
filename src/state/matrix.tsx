import { computed, observable, action } from "mobx";

import { CellKey } from 'interface/common'

class CellModel {
  /**
   * 矩阵行数
   */
  @observable row: number = 10
  /**
   * 矩阵列数
   */
  @observable col: number = 10
  /**
   * 矩阵单元格模型
   */
  @observable cellModels: Array<Array<CellKey>> = []
  /**
   * 需要合并的单元格
   */
  @observable mergeCellList: Array<CellKey> = []
  /**
   * 需要隐藏的单元格
   */
  @observable hideCellList: Array<CellKey> = []

  
  @action setCellModels(cellModels: Array<Array<CellKey>>) {
    this.cellModels = cellModels
  }

}

export default new CellModel()