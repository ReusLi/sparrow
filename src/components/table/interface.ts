import { CellKey, SelectInfo } from 'interface/common'

export interface CellKey extends CellKey { }

export interface SelectInfo extends SelectInfo { }

export interface TableProps { }

export interface TableState {
    // 表头是否可以编辑
    isEditable: boolean,
    selectInfo: SelectInfo,
    mouseDownPoint: CellKey
}