import { CellKey, SelectInfo } from 'interface/common'

export interface CellKey extends CellKey { }

export interface SelectInfo extends SelectInfo { }

/**
 * 矩阵状态
 * row 矩阵行数
 * col 矩阵列数
 * cellModels 矩阵内单元格模型 是一个 row * col 的 二维数组
 */
export interface MatrixState {
    row: number,
    col: number,
    cellModels: Array<Array<CellKey>>
}

export interface MatrixProps {

}