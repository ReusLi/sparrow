import { CellKey, SelectInfo } from 'interface/common'

export interface CellKey extends CellKey { }

export interface SelectInfo extends SelectInfo { }

export interface MatrixState {
    row: number,
    col: number,
    cellModels: Array<Array<CellKey>>
}

export interface MatrixProps {

}