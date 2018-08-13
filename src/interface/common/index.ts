export interface CellKey {
    X: number,
    Y: number
}

export interface SelectInfo {
    startCell: CellKey
    endCell: CellKey
}