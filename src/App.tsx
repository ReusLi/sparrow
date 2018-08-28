import * as React from 'react'

import { Row } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

import { CellKey } from 'cell/interface';

interface MatrixState {
    row: number,
    col: number
}

interface MatrixProps {

}

export default class App extends React.Component<MatrixProps, MatrixState> {
    private cellModels: Array<Array<CellKey>>

    private kcList: Array<CellKey> = []

    constructor(props: MatrixProps, state: MatrixState) {
        super(props);

        this.state = {
            row: 10,
            col: 10
        }
    }
    /**
     * 通过2点确定矩阵左上角和右下角的坐标
     */

    /**
     * 通过矩阵的左上角和右下角坐标
     * 构建出矩阵内所有要跳过的点集合
     * @param leftTopKey 
     * @param rightBottomKey 
     * 
     * @return {Array<CellKey>}
     */
    private getSkipCellByCellKeys(leftTopKey: CellKey, rightBottomKey: CellKey) {
        let xLen: number = rightBottomKey.X - leftTopKey.X + 1,
            yLen: number = rightBottomKey.Y - leftTopKey.Y + 1,
            noUseCells: Array<CellKey> = [];

        for (let X = leftTopKey.X, i = 0; i < xLen; i++) {
            for (let Y = leftTopKey.Y, j = 0; j < yLen; j++) {
                noUseCells.push({
                    X: X + i,
                    Y: Y + j
                })
            }

        }
        // 左上角的点是用来构造colspan rowspan的, 应该shift掉
        let kc: CellKey = noUseCells.shift()
        kc.rowSpan = xLen
        kc.colSpan = yLen

        this.kcList.push(kc)

        return noUseCells;
    }

    /**
     * 构建n*n的矩阵数据模型
     * @param row 
     * @param col 
     * @param kcList 
     * @param noUseCells 
     */
    private buildMatrixModel(row: number, col: number,kcList: Array<CellKey>, noUseCells: Array<CellKey>) {
        let matrixModel: Array<Array<CellKey>> = [],
            cellKey: CellKey

        for (let i = 0; i < row; i++) {
            matrixModel.push([])
            for (let j = 0; j < col; j++) {
                cellKey = { X: i, Y: j }

                // 判断是否是no use cell, 如果是, 不需要push进matrixModel
                let isNoUseCell = noUseCells.some(cell => cell.X === cellKey.X && cell.Y === cellKey.Y)

                isNoUseCell ? null : matrixModel[i].push(cellKey)
            }
        }

        kcList.forEach((cell) => {
            matrixModel[cell.X][cell.Y] = cell;
        })
        return matrixModel;
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        let c1 = {
            X: 7,
            Y: 7
        }

        let c2 = {
            X: 8,
            Y: 8
        }

        let c3 = {
            X: 1,
            Y: 1
        }

        let c4 = {
            X: 3,
            Y: 4
        }
        let noUseCells1 = this.getSkipCellByCellKeys(c1, c2)
        let noUseCells2 = this.getSkipCellByCellKeys(c3, c4)
        let noUseCells = [].concat(noUseCells1, noUseCells2)
        this.cellModels = this.buildMatrixModel(this.state.row, this.state.col, this.kcList, noUseCells)
    }

    public render() {
        return (
            <Row>

                {/* 操作cell的按钮组 */}
                <Row className="kjax-handle-btn">
                    <ButtonGroup />
                </Row>

                {/* cell panel */}
                <Row>
                    <Table cellModels={this.cellModels} />
                </Row>

            </Row>
        )
    }
}