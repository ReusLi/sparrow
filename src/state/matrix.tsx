import { computed, observable, action } from "mobx";

import { CellKey } from 'interface/common'

class CellModel {
  @observable row: number = 10
  @observable col: number = 10
  @observable cellModels: Array<Array<CellKey>> = []

  
  @action setCellModels(cellModels: Array<Array<CellKey>>) {
    this.cellModels = cellModels
  }

}

export default new CellModel()