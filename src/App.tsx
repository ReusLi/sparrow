import * as React from 'react'

import { Row } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

import { CellKey } from 'cell/interface';

// context
import { MatrixContext } from 'context/matrixContext'

interface MatrixState {
    row: number,
    col: number,
    cellModels: Array<Array<CellKey>>
}

interface MatrixProps {

}

export default class App extends React.Component<MatrixProps, MatrixState> {

    private mouseDownCell: CellKey

    private mouseUpCell: CellKey

    private mergeCellList: Array<CellKey> = []

    private hideCellList: Array<CellKey> = []

    constructor(props: MatrixProps, state: MatrixState) {
        super(props);

        this.state = {
            row: 10,
            col: 10,
            cellModels: []
        }
    }

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
            hideCellList: Array<CellKey> = [];

        for (let X = leftTopKey.X, i = 0; i < xLen; i++) {
            for (let Y = leftTopKey.Y, j = 0; j < yLen; j++) {
                hideCellList.push({
                    X: X + i,
                    Y: Y + j
                })
            }

        }
        // 左上角的点是用来构造colspan rowspan的, 应该shift掉
        let kc: CellKey = hideCellList.shift()
        kc.rowSpan = xLen
        kc.colSpan = yLen

        this.mergeCellList.push(kc)
        return hideCellList;
    }

    /**
     * 构建n*n的矩阵数据模型
     * @param row 
     * @param col 
     * @param mergeCellList 
     * @param hideCellList 
     */
    private buildMatrixModel(row: number, col: number, mergeCellList: Array<CellKey>, hideCellList: Array<CellKey>) {
        let matrixModel: Array<Array<CellKey>> = [],
            cellKey: CellKey

        for (let i = 0; i < row; i++) {
            matrixModel.push([])
            for (let j = 0; j < col; j++) {
                cellKey = { X: i, Y: j }

                // 判断是否是no use cell, 如果是, 不需要push进matrixModel
                let isHideCell = hideCellList.some(cell => cell.X === cellKey.X && cell.Y === cellKey.Y)

                isHideCell ? null : matrixModel[i].push(cellKey)
            }
        }

        mergeCellList.forEach((cell) => {
            matrixModel[cell.X][cell.Y] = cell;
        })
        return matrixModel;
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        let cellModels: Array<Array<CellKey>> = this.buildMatrixModel(this.state.row, this.state.col, this.mergeCellList, this.hideCellList)
        this.setState({
            cellModels: cellModels
        })
    }

    private onCellMouseDown(cellKey: CellKey) {
        this.mouseDownCell = cellKey
    }

    private onCellMouseUp(cellKey: CellKey) {
        // 如果是点击一个单元格 不需要做处理
        if (this.isSameCellKey(this.mouseDownCell, cellKey)) {
            return false;
        }
        
        this.mouseUpCell = cellKey
        let hideCellList: Array<CellKey> = this.getSkipCellByCellKeys(this.mouseDownCell, this.mouseUpCell)
        this.hideCellList = this.hideCellList.concat(hideCellList)
        let cellModels: Array<Array<CellKey>> = this.buildMatrixModel(this.state.row, this.state.col, this.mergeCellList, this.hideCellList)
        this.setState({
            cellModels: cellModels
        })
    }

    private isSameCellKey (ck1: CellKey, ck2: CellKey) {
        return ck1.X === ck2.X && ck1.Y === ck2.Y;
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
                    <MatrixContext.Provider
                        value={
                            {
                                onCellMouseDown: this.onCellMouseDown.bind(this),
                                onCellMouseUp: this.onCellMouseUp.bind(this)
                            }
                        }>
                        <Table cellModels={this.state.cellModels} />
                    </MatrixContext.Provider>
                </Row>

            </Row>
        )
    }
}