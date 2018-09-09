import { CellKey } from 'interface/common'

export interface CellKey extends CellKey { }

export interface MatrixState {
    row: number,
    col: number,
    cellModels: Array<Array<CellKey>>
}

export interface MatrixProps {

}