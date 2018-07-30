import * as React from 'react'

// 样式
import './cell.css'

interface cellKey {
    X: number,
    Y: number
}

interface selectInfo {
    startPoint: cellKey
    endPoint: cellKey
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

    constructor(props: props, state: state) {
        super(props);

        this.state = {
            isEditable: true,
            className: ['custom-cell']
        }
    }

    public componentWillMount() {
        console.log(this.props.cellKey.Y)
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

    /**
     * 
     */
    private setfocusClass() {
        if (!this.isInSideCell()) {
            return false;
        }
        let className = ['custom-cell'];
        console.log('pass')
        className = this.isTop(className)
        className = this.isRight(className)
        className = this.isBottm(className)
        className = this.isLeft(className)

        this.setState({
            className: className
        })
    }

    private isTop(className: Array<string>) {
        var myRow = this.props.cellKey.X,
            startRow = this.props.selectInfo.startPoint.X,
            endRow = this.props.selectInfo.endPoint.X;

        if (myRow === startRow && startRow <= endRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    private isRight(className: Array<string>) {
        var myCol = this.props.cellKey.Y,
            startCol = this.props.selectInfo.startPoint.Y,
            endCol = this.props.selectInfo.endPoint.Y;

        if (myCol === startCol && startCol <= endCol) {
            className.push(this.focusClass.RIGHT)
        }
        return className;
    }

    private isBottm(className: Array<string>) {
        var myRow = this.props.cellKey.X,
            startRow = this.props.selectInfo.startPoint.X,
            endRow = this.props.selectInfo.endPoint.X;

        if (myRow === endRow && startRow <= endRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    private isLeft(className: Array<string>) {
        var myCol = this.props.cellKey.Y,
            startCol = this.props.selectInfo.startPoint.Y,
            endCol = this.props.selectInfo.endPoint.Y;

        if (myCol === endCol && startCol <= endCol) {
            className.push(this.focusClass.RIGHT)
        }

        return className;
    }

    private isInSideCell() {
        let isPass = false

        let x0 = this.props.selectInfo.startPoint.X,
            y0 = this.props.selectInfo.startPoint.Y,
            x1 = this.props.selectInfo.endPoint.X,
            y1 = this.props.selectInfo.endPoint.Y,
            cX = this.props.cellKey.X,
            cY = this.props.cellKey.Y;
        if (x0 <= cX && cX <= x1 && y0 <= cY && cY <=y1) {
            isPass = true;
        }
        
        return isPass;
    }
}