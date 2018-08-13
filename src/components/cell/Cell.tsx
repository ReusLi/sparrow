import * as React from 'react'

import { CellProps, CellState } from './interface'

// 样式
import './cell.css'


export default class Cell extends React.Component<CellProps, CellState> {
    public className = ''

    public focusClass = {
        TOP: 'custom-focus-top',
        RIGHT: 'custom-focus-right',
        BOTTOM: 'custom-focus-bottom',
        LEFT: 'custom-focus-left'
    }

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
            <th
                className={this.state.className.join(' ')}
                contentEditable={this.props.isEditable}
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseOver={this.onMouseOver.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}
                // 不要warning contentEditable效果
                suppressContentEditableWarning={true}
            >
                {this.props.text}
            </th>
        )
    }

    private onMouseDown() {
        this.props.mouseDownEvent(this.props.cellKey)
    }

    private onMouseOver() {
        this.props.mouseOverEvent(this.props.cellKey)
    }

    private onMouseUp() {
        this.props.mouseUpEvent(this.props.cellKey)
    }

    /**
     * 设置单元格样式
     * @param props
     */
    private setCellStyle(props: CellProps) {
        let className: Array<string> = ['custom-cell']

        if (this.isInSideCell(props)) {
            className.push('inside-cell')
            className = this.isTop(className, props)
            className = this.isRight(className, props)
            className = this.isBottm(className, props)
            className = this.isLeft(className, props)
        }

        this.setState({
            className: className
        })
    }

    private isTop(className: Array<string>, props: CellProps) {
        var myRow = props.cellKey.X,
            startRow = props.selectInfo.startCell.X;

        if (myRow === startRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    private isRight(className: Array<string>, props: CellProps) {
        var myCol = props.cellKey.Y,
            endCol = props.selectInfo.endCell.Y;

        if (myCol === endCol) {
            className.push(this.focusClass.RIGHT)
        }
        return className;
    }

    private isBottm(className: Array<string>, props: CellProps) {
        var myRow = props.cellKey.X,
            endRow = props.selectInfo.endCell.X;
        if (myRow === endRow) {
            className.push(this.focusClass.BOTTOM)
        }
        return className;
    }

    private isLeft(className: Array<string>, props: CellProps) {
        var myCol = props.cellKey.Y,
            startCol = props.selectInfo.startCell.Y;

        if (myCol === startCol) {
            className.push(this.focusClass.LEFT)
        }

        return className;
    }

    private isInSideCell(props: CellProps) {
        let isPass = false

        let x0 = props.selectInfo.startCell.X,
            y0 = props.selectInfo.startCell.Y,
            x1 = props.selectInfo.endCell.X,
            y1 = props.selectInfo.endCell.Y,
            cX = props.cellKey.X,
            cY = props.cellKey.Y;

        if (x0 <= cX && cX <= x1 && y0 <= cY && cY <= y1) {
            isPass = true;
        }

        return isPass;
    }
}