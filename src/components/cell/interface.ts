
export interface CellKey {
    X: number,
    Y: number
}

export interface SelectInfo {
    startCell: CellKey
    endCell: CellKey
}

export interface CellProps {
    text: string,
    cellKey: CellKey,
    isEditable: boolean,
    selectInfo: SelectInfo,
    mouseDownEvent: Function,
    mouseUpEvent: Function,
    mouseOverEvent: Function
}

export interface CellState {
    // 表头是否可以编辑
    isEditable: boolean,

    // cell`s class
    className: Array<string>
}