import * as React from 'react'

// interface
import { CellKey, SelectInfo, TableState, TableProps } from './interface'

import Cell from 'components/cell/cell'


export default class Table extends React.Component<TableProps, TableState> {
    // 是否 mouse down
    // 只有true时, cell组件的mouse over emit 才会有效
    private isMouseDown: boolean = false

    constructor(props: TableProps, state: TableState) {
        super(props);

        this.state = {
            isEditable: true,
            selectInfo: {
                startCell: {
                    X: -1,
                    Y: -1
                },

                endCell: {
                    X: -1,
                    Y: -1
                }
            },
            mouseDownPoint: {
                X: -1,
                Y: -1
            }
        }
    }

    /**
     * 初始化单元格
     * @param rowNum 行数
     * @param colNum 列数
     */
    private initTableHeader(rowNum: number, colNum: number) {
        let rowArray = [],
            colArray = [];
        // cell组件props
        let cellProps;

        for (let rowIndex = 0; rowIndex < rowNum; rowIndex++) {
            colArray = []
            for (let colIndex = 0; colIndex < colNum; colIndex++) {
                cellProps = this.getCellProps();
                cellProps = this.buildCellProps(rowIndex, cellProps, colIndex)

                colArray.push(
                    <Cell {...cellProps} />
                )
            }
            rowArray.push(
                <tr key={`row_${rowIndex}`}>
                    {colArray}
                </tr>
            )
        }

        return rowArray;
    }

    /**
     * 获取表格cell组件的属性
     */
    private getCellProps() {
        let cellProps = {
            key: '',
            text: '',
            cellKey: {
                X: 0,
                Y: 0
            },
            selectInfo: this.state.selectInfo
        }

        return cellProps;
    }

    /**
     * 构建表格cell组件的props
     * 
     * @param lineNum 行号
     * @param cellProps cell组件的props object
     * @param index 循环的下标
     */
    private buildCellProps(rowIndex: number, cellProps: any, colIndex: number) {

        cellProps.key = `${colIndex}_${rowIndex}`
        cellProps.text = `(${rowIndex}, ${colIndex})`
        cellProps.cellKey.X = Number(rowIndex)
        cellProps.cellKey.Y = colIndex
        cellProps.mouseDownEvent = this.mouseDownEvent.bind(this)
        cellProps.mouseOverEvent = this.mouseOverEvent.bind(this)
        cellProps.mouseUpEvent = this.mouseUpEvent.bind(this)
        cellProps.selectInfo = this.state.selectInfo
        cellProps.isEditable = this.state.isEditable
        return cellProps;
    }

    /**
     * 触发mouse down时, 重置 startcell endcell为当前cell, 即变成单选一个cell的状态
     * 同时设置isMouseDown状态为true 表示当前鼠标被按下
     * 
     * @param cellKey mouse down cell
     */
    private mouseDownEvent(cellKey: CellKey) {
        this.setState({
            selectInfo: {
                startCell: {
                    X: cellKey.X,
                    Y: cellKey.Y
                },
                endCell: {
                    X: cellKey.X,
                    Y: cellKey.Y
                }
            },
            mouseDownPoint: {
                X: cellKey.X,
                Y: cellKey.Y
            }
        })

        this.isMouseDown = true
    }

    /**
     * 没划过一个cell 就会更新坐标轴的2点 更新新的矩阵
     * 如果isMouseDown为false, 表示当前没有按下鼠标
     * @param cellKey mouse over cell
     */
    private mouseOverEvent(cellKey: CellKey) {
        if (!this.isMouseDown) {
            return false
        }

        this.updateCurKeyRand(cellKey)
    }

    /**
     * 鼠标放开时 把isMouseDown状态设置为false
     * 此时继续触发mouse over event也不会继续更新矩阵2点状态
     * @param cellKey mouse up cell
     */
    private mouseUpEvent(cellKey: CellKey) {
        this.updateCurKeyRand(cellKey)

        this.isMouseDown = false
    }

    /**
     * 更新坐标范围
     * @param cellKey 
     */
    private updateCurKeyRand(cellKey: CellKey) {
        let startCell_X = this.state.mouseDownPoint.X,
            startCell_Y = this.state.mouseDownPoint.Y

        let selectInfo: SelectInfo = {
            startCell: {
                X: startCell_X,
                Y: startCell_Y
            },
            endCell: {
                X: cellKey.X,
                Y: cellKey.Y
            }
        }

        selectInfo = this.buildXY(selectInfo)

        this.setState({
            selectInfo: {
                startCell: {
                    X: selectInfo.startCell.X,
                    Y: selectInfo.startCell.Y
                },
                endCell: {
                    X: selectInfo.endCell.X,
                    Y: selectInfo.endCell.Y
                }
            }
        })
    }

    /**
     * 构建XY坐标中的两点
     */
    private buildXY(selectInfo: SelectInfo) {
        let startCell: CellKey = {
            X: 0,
            Y: 0
        }
        let endCell: CellKey = {
            X: 0,
            Y: 0
        }

        selectInfo.startCell.X < selectInfo.endCell.X
            ? startCell.X = selectInfo.startCell.X
            : startCell.X = selectInfo.endCell.X

        selectInfo.startCell.Y < selectInfo.endCell.Y
            ? startCell.Y = selectInfo.startCell.Y
            : startCell.Y = selectInfo.endCell.Y

        selectInfo.startCell.X > selectInfo.endCell.X
            ? endCell.X = selectInfo.startCell.X
            : endCell.X = selectInfo.endCell.X

        selectInfo.startCell.Y > selectInfo.endCell.Y
            ? endCell.Y = selectInfo.startCell.Y
            : endCell.Y = selectInfo.endCell.Y

        return {
            startCell: startCell,
            endCell: endCell
        }
    }

    renderCellList() {
        let row = 10,
            col = 10;
        let tableHeader = this.initTableHeader(row, col)
        return (
            <table>
                <thead className="ant-table-thead">
                    {tableHeader}
                </thead>
            </table>
        )
    }

    public render() {
        return this.renderCellList()
    }
}