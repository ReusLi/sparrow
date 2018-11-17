// 样式
import './cell.css'

import { CellProps, CellState } from 'cell/interface'

import * as React from 'react'

import { cellStyleJudge } from 'components/cell/cellStyleJudge'

// context
import { MatrixContext } from 'context/matrixContext'

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore'

// matrixStore mobx
import cellStore from 'store/cell/cellStore'

import { observer } from 'mobx-react';

@observer
export default class Cell extends React.Component<CellProps, CellState> {
    public className = ''

    private cellStyleJudge = new cellStyleJudge()

    constructor(props: CellProps, state: CellState) {
        super(props);
        this.state = {
            isEditable: true,
            className: ['custom-cell']
        }
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        this.setCellStyle(this.props)
    }

    /**
     * props变化时触发, 第一次render不会触发
     */
    componentWillReceiveProps(nextProps: CellProps) {
        this.setCellStyle(nextProps)
    }

    public render() {
        return (
            <MatrixContext.Consumer>
                {
                    context =>
                        <th
                            rowSpan={this.props.cellKey.rowSpan}
                            colSpan={this.props.cellKey.colSpan}
                            className={this.state.className.join(' ')}
                            contentEditable={this.props.isEditable}
                            onMouseDown={this.onMouseDown.bind(this, context.onCellMouseDown)}
                            onMouseOver={this.onMouseOver.bind(this)}
                            onMouseUp={this.onMouseUp.bind(this, context.onCellMouseUp)}
                            // 不要warning contentEditable效果
                            suppressContentEditableWarning={true}
                        >
                            {this.props.text}
                        </th>

                }

            </MatrixContext.Consumer>
        )
    }

    private onMouseDown(onCellMouseDown: Function) {
        // onCellMouseDown(this.props.cellKey)
        matrixStore.onCellMouseDown(this.props.cellKey)
        cellStore.onMouseDown(this.props.cellKey)
        // this.props.mouseDownEvent(this.props.cellKey)
    }

    private onMouseOver() {
        cellStore.onMouseOver(this.props.cellKey)
        // this.props.mouseOverEvent(this.props.cellKey)
    }

    private onMouseUp(onCellMouseUp: Function) {
        // onCellMouseUp(this.props.cellKey)
        matrixStore.onCellMouseUp(this.props.cellKey)
        cellStore.onMouseUp(this.props.cellKey)
        // this.props.mouseUpEvent(this.props.cellKey)
    }

    /**
     * 设置单元格样式      
     * @param props
     */
    private setCellStyle(props: CellProps) {
        let className: Array<string> = ['custom-cell']

        if (this.isInSideCell(props)) {
            className.push('inside-cell')
            className = this.cellStyleJudge.isTop(className, props)
            className = this.cellStyleJudge.isRight(className, props)
            className = this.cellStyleJudge.isBottom(className, props)
            className = this.cellStyleJudge.isLeft(className, props)
        }

        this.setState({
            className: className
        })
    }

    private isInSideCell(props: CellProps) {
        let isPass = false

        let x0 = cellStore.selectInfo.startCell.X,
            y0 = cellStore.selectInfo.startCell.Y,
            x1 = cellStore.selectInfo.endCell.X,
            y1 = cellStore.selectInfo.endCell.Y,
            cX = props.cellKey.X,
            cY = props.cellKey.Y;

        if (x0 <= cX && cX <= x1 && y0 <= cY && cY <= y1) {
            isPass = true;
        }

        return isPass;
    }
}