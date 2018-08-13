// 单元格信息
export interface CellKey {
    // x坐标
    X: number,
    // y坐标
    Y: number
}

// 选择的2个单元格坐标信息
export interface SelectInfo {
    // 开始的单元格
    startCell: CellKey
    // 结束的单元格
    endCell: CellKey
}