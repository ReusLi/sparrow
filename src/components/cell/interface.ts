import { CellKey, SelectInfo } from 'interface/common'

export interface CellKey extends CellKey { }

export interface SelectInfo extends SelectInfo { }

export interface CellProps {
    // cell text
    text: string,
    
    // 单元格key
    cellKey: CellKey,
    
    // 是否可编辑
    isEditable: boolean,
    
    // 父组件选择的区域信息
    selectInfo: SelectInfo,

    mouseDownEvent: Function,

    mouseUpEvent: Function,

    mouseOverEvent: Function
}

export interface CellState {
    // 表头是否可以编辑
    isEditable: boolean,

    // 单元格 class
    className: Array<string>
}