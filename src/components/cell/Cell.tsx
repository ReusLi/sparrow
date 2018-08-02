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
    isEditable: boolean,
    selectInfo: selectInfo,
    mouseDownEvent: Function,
    mouseUpEvent: Function,
    mouseOverEvent: Function
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

    static componentWillMount() {
        console.log('222')
        // this.setfocusClass()
    }

    /**
     * props变化时触发, 第一次render不会触发
     */
    componentWillReceiveProps() {
        this.setfocusClass()
        // console.log('componentWillReceiveProps')
    }

    static getDerivedStateFromProps(nextProps: object, prevState: object) {
        // console.log('getDerivedStateFromProps')
        return nextProps
    }

    componentDidUpdate() {
        this.setfocusClass()
        // console.log('componentDidUpdate ')
    }

    getSnapshotBeforeUpdate(prevProps: object, prevState: object) {
        // console.log('getSnapshotBeforeUpdate')
    }

    shouldComponentUpdate () {
        // console.log('shouldComponentUpdate ')
        return true
    }
    

    public render() {
        return (
            <th
                className={this.state.className.join(' ')}
                contentEditable={this.props.isEditable}
                onMouseDown={this.onMouseDown.bind(this)}
            >
                {this.props.text}
            </th>
        )
    }

    private onMouseDown() {
        this.props.mouseDownEvent(this.props.cellKey)
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
        var myRow = this.props.cellKey.X,
            startRow = this.props.selectInfo.startPoint.X;

        if (myRow === startRow) {
            className.push(this.focusClass.TOP)
        }
        return className;
    }

    private isRight(className: Array<string>) {
        var myCol = this.props.cellKey.Y,
            endCol = this.props.selectInfo.endPoint.Y;

        if (myCol === endCol) {
            className.push(this.focusClass.RIGHT)
        }
        return className;
    }

    private isBottm(className: Array<string>) {
        var myRow = this.props.cellKey.X,
            endRow = this.props.selectInfo.endPoint.X;
        if (myRow === endRow) {
            className.push(this.focusClass.BOTTOM)
        }
        return className;
    }

    private isLeft(className: Array<string>) {
        var myCol = this.props.cellKey.Y,
            startCol = this.props.selectInfo.startPoint.Y;

        if (myCol === startCol) {
            className.push(this.focusClass.LEFT)
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