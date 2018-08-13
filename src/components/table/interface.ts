export interface CellKey {
    // X轴坐标
    X: number,
    // Y轴坐标
    Y: number
}

export interface SelectInfo {
    // 鼠标开始mouse down的cell
    startCell: CellKey
    // mouse up 的 cell
    endCell: CellKey
}

export interface TableProps {

}

export interface TableState {
    // 表头是否可以编辑
    isEditable: boolean,
    selectInfo: SelectInfo,
    mouseDownPoint: CellKey
}