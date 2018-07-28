import * as React from 'react'

// 样式
import './cell.css'

interface cellKey {
    row: number,
    col: number
}

interface selectInfo {
    startCell: cellKey
    endCell: cellKey
}

interface props {
    text: string,
    cellKey: cellKey,
    selectInfo: selectInfo
}

interface state {
    // 表头是否可以编辑
    isEditable: boolean,

    // cell`s class
    className: Array<string>
}

export default class Cell extends React.Component<props, state> {

    public focusClass = {
        TOP: 'custom-focus-top',
        RIGHT: 'custom-focus-right',
        BOTTOM: 'custom-focus-bottom',
        LEFT: 'custom-focus-left'
    }

    private test = ['custom-focus-top']

    constructor(props: props, state: state) {
        super(props);

        this.state = {
            isEditable: true,
            className: ['custom-cell']
        }
    }

    public componentWillMount() {
        this.buildXY();
        this.setfocusClass()
    }

    /**
     * props变化时触发, 第一次render不会触发
     */
    public componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    public render() {
        return (
            <th
                className={this.state.className.join(' ')}
                contentEditable={this.state.isEditable}
                onMouseDown={this.onMouseDown.bind(this)}
            >
                {this.props.text}
            </th>
        )
    }

    private onMouseDown() {

    }

    private buildXY() {
        let selectInfo = this.props.selectInfo;

        let startPoint = {
            X: 0,
            Y: 0
        }
        let endPoint = {
            X: 0,
            Y: 0
        }


        selectInfo.startCell.row < selectInfo.endCell.row
            ? startPoint.X = selectInfo.startCell.row
            : startPoint.X = selectInfo.endCell.row

        selectInfo.startCell.col < selectInfo.endCell.col
            ? startPoint.Y = selectInfo.startCell.col
            : startPoint.Y = selectInfo.endCell.col

        selectInfo.startCell.row > selectInfo.endCell.row
            ? endPoint.X = selectInfo.startCell.row
            : endPoint.X = selectInfo.endCell.row

        selectInfo.startCell.col > selectInfo.endCell.col
            ? endPoint.Y = selectInfo.startCell.col
            : endPoint.Y = selectInfo.endCell.col

        console.log(startPoint)
        console.log(endPoint)
    }

    /**
     * 
     */
    private setfocusClass() {
        if (!this.isInSideCell()) {
            return false;
        }
        let className = ['custom-cell'];

        className = this.isTop(className)
        className = this.isRight(className)
        className = this.isBottm(className)
        className = this.isLeft(className)

        this.setState({
            className: className
        })
    }

    private isTop(className: Array<string>) {
        var myRow = this.props.cellKey.row,
            startRow = this.props.selectInfo.startCell.row,
            endRow = this.props.selectInfo.endCell.row;

        if (myRow === startRow && startRow <= endRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    private isRight(className: Array<string>) {
        var myCol = this.props.cellKey.col,
            startCol = this.props.selectInfo.startCell.col,
            endCol = this.props.selectInfo.endCell.col;

        if (myCol === startCol && startCol <= endCol) {
            className.push(this.focusClass.RIGHT)
        }
        return className;
    }

    private isBottm(className: Array<string>) {
        var myRow = this.props.cellKey.row,
            startRow = this.props.selectInfo.startCell.row,
            endRow = this.props.selectInfo.endCell.row;

        if (myRow === endRow && startRow <= endRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    private isLeft(className: Array<string>) {
        var myCol = this.props.cellKey.col,
            startCol = this.props.selectInfo.startCell.col,
            endCol = this.props.selectInfo.endCell.col;

        if (myCol === endCol && startCol <= endCol) {
            className.push(this.focusClass.RIGHT)
        }

        return className;
    }

    private isInSideCell() {
        var isPass = false,
            myRow = this.props.cellKey.row,
            startRow = this.props.selectInfo.startCell.row,
            endRow = this.props.selectInfo.endCell.row;

        isPass = (startRow >= endRow && startRow >= myRow && myRow <= endRow)
            || (endRow >= startRow && endRow >= myRow && myRow <= startRow);

        return isPass;
    }
}