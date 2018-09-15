import * as React from 'react'

import { Row } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

// import { observable } from 'mobx'


// context
import { MatrixContext } from 'context/matrixContext'

// interface
import { MatrixState, MatrixProps, CellKey, SelectInfo } from './interface'

// utils 
import MatrixUtils from 'utils/matrix.utils'

export default class Matrix extends React.Component<MatrixProps, MatrixState> {
    private mouseDownCell: CellKey

    private mouseUpCell: CellKey

    /**
     * 需要合并的单元格
     */
    private mergeCellList: Array<CellKey> = []

    /**
     * 需要隐藏的单元格
     */
    private hideCellList: Array<CellKey> = []

    constructor(props: MatrixProps, state: MatrixState) {
        super(props);

        this.state = {
            row: 10,
            col: 10,
            cellModels: []
        }
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

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        let cellModels: Array<Array<CellKey>> = this.buildMatrixModel(this.state.row, this.state.col, this.mergeCellList, this.hideCellList)
        this.setState({
            cellModels: cellModels
        })
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
        let matrixModel: Array<Array<CellKey>> = []

        // 获取matrixModel, 且model会满足:
        // 1. 所有的cell rowspan colspan都是1
        // 2. 不包含隐藏的cell
        matrixModel = this.buildMatrixNormalCell(row, col, matrixModel, hideCellList)

        // 按照megeCellList, 把对应的cell设置rowspan colspan
        matrixModel = this.buildMatrixMergeCell(matrixModel, mergeCellList)

        return matrixModel;
    }
    /**
     * 构建n*n的矩阵二维数组, 并且数组中不需要存在隐藏的cell
     * @param row 
     * @param col 
     * @param matrixModel 
     * @param hideCellList 
     * 
     * @return {Array<Array<CellKey>>} matrixModel
     */
    private buildMatrixNormalCell(row: number, col: number, matrixModel: Array<Array<CellKey>>, hideCellList: Array<CellKey>) {
        let cellKey: CellKey

        for (let i = 0; i < row; i++) {
            matrixModel.push([])
            for (let j = 0; j < col; j++) {
                cellKey = { X: i, Y: j }

                // 判断是否是no use cell, 如果是, 不需要push进matrixModel
                let isHideCell = hideCellList.some(cell => cell.X === cellKey.X && cell.Y === cellKey.Y)

                isHideCell ? null : matrixModel[i].push(cellKey)
            }
        }
        return matrixModel;
    }

    /**
     * 把单元格的rowspan colspan赋值
     * @param matrixModel 
     * @param mergeCellList 
     * 
     * @return {Array<Array<CellKey>>} matrixModel
     */
    private buildMatrixMergeCell(matrixModel: Array<Array<CellKey>>, mergeCellList: Array<CellKey>) {
        mergeCellList.forEach(cell => {
            matrixModel[cell.X].forEach((rowitem, rowindex) => {
                if (rowitem.Y === cell.Y) {
                    matrixModel[cell.X][rowindex] = cell;
                }
            })
        })
        return matrixModel;
    }

    /**
     * cell组件触发mouse down事件时, 会通过context通知 matrix组件
     * 记录下mouse down cell信息
     * @param cellKey 
     */
    private onCellMouseDown(cellKey: CellKey) {
        this.mouseDownCell = cellKey
    }

    /**
     * cell组件mouse up事件时
     * @param cellKey 
     */
    private onCellMouseUp(cellKey: CellKey) {
        // 如果是点击一个单元格 不需要做处理
        if (this.isSameCellKey(this.mouseDownCell, cellKey)) {
            return false;
        }

        this.mouseUpCell = cellKey
        let SelectInfo: SelectInfo = MatrixUtils.buildXY(this.mouseDownCell, this.mouseUpCell)
        let hideCellList: Array<CellKey> = this.getSkipCellByCellKeys(SelectInfo.startCell, SelectInfo.endCell)
        this.hideCellList = this.hideCellList.concat(hideCellList)
    }

    /**
     * 更新矩阵模型
     */
    public updateMatrixModel() {
        let cellModels: Array<Array<CellKey>> = this.buildMatrixModel(this.state.row, this.state.col, this.mergeCellList, this.hideCellList)
        this.setState({
            cellModels: cellModels
        })
    }

    private isSameCellKey(ck1: CellKey, ck2: CellKey) {
        return ck1.X === ck2.X && ck1.Y === ck2.Y;
    }
}