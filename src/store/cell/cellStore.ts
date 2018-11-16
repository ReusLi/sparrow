import { computed, observable, action } from "mobx"

import { CellKey, SelectInfo } from 'interface/common'
import Cell from "components/cell/cell";

class cellStore {
    isEditable: boolean = true

    selectInfo: SelectInfo

    mouseDownPoint: CellKey


}

export default new cellStore()