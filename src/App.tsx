import * as React from 'react'

import { Row } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

import { CellKey } from 'cell/interface';
import Cell from 'cell/cell';

interface MatrixState {
    row: number,
    col: number
}

interface MatrixProps {

}

export default class App extends React.Component<MatrixProps, MatrixState> {
    private row: number
    private col: number
    private cellModels: Array<Array<CellKey>>

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
     * 构建出矩阵内所有点的集合
     */

    /**
     * 构建n*n的矩阵数据模型
     * @param row 
     * @param col 
     * @param noUseCells 
     */
    private buildMatrixModel(row: number, col: number) {
        let matrixModel: Array<Array<CellKey>> = [],
            cellKey: CellKey

        for (let i = 0; i < row; i++) {
            matrixModel.push([])
            for (let j = 0; j < col; j++) {
                cellKey = { X: i, Y: j }
                matrixModel[i].push(cellKey)
            }
        }

        return matrixModel;
    }
    private buildCellKey() {
        this.cellModels = [
            [
                { X: 0, Y: 0 },
                { X: 0, Y: 1 },
                { X: 0, Y: 2 },
                { X: 0, Y: 3 },
                { X: 0, Y: 4 },
                { X: 0, Y: 5 }
            ],
            [
                { X: 1, Y: 0 },
                { X: 1, Y: 1, colSpan: 3, rowSpan: 2 },
                // {X: 1, Y: 2},
                // {X: 1, Y: 3},
                { X: 1, Y: 4 },
                { X: 1, Y: 5 }
            ],
            [
                { X: 2, Y: 0 },
                // {X: 2, Y: 1},
                // {X: 2, Y: 2},
                // {X: 2, Y: 3},
                { X: 2, Y: 4 },
                { X: 2, Y: 5 }
            ],
            [
                { X: 3, Y: 0 },
                { X: 3, Y: 1 },
                { X: 3, Y: 2 },
                { X: 3, Y: 3 },
                { X: 3, Y: 4 },
                { X: 3, Y: 5 }
            ]
        ]
        return this.cellModels;
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        this.cellModels = this.buildMatrixModel(this.state.row, this.state.col)
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