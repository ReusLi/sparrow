import * as React from 'react'

import Cell from 'components/cell/Cell'

interface cellKey {
    // X轴坐标
    X: number,
    // Y轴坐标
    Y: number
}

interface selectInfo {
    // 鼠标开始mouse down的cell
    startPoint: cellKey
    // mouse up 的 cell
    endPoint: cellKey
}

interface props {
    header: Array<string>
}

interface state {
    // 表头是否可以编辑
    isEditable: boolean,
    startPoint: object,
    endPoint: object,
    selectInfo: selectInfo
}

export default class Table extends React.Component<props, state> {
    private thCom0: Array<any> = []

    constructor(props: props, state: state) {
        super(props);

        this.state = {
            isEditable: true,
            startPoint: {},
            endPoint: {},
            selectInfo: {
                startPoint: {
                    X: 0,
                    Y: 1
                },

                endPoint: {
                    X: 0,
                    Y: 2
                }
            }
        }
    }

    /**
     * 初始化表头
     */
    private initTh() {
        this.thCom0 = [];
        // cell组件props
        let cellProps;
        this.props.header.forEach((element, index) => {
            cellProps = this.getCellProps();
            cellProps = this.buildCellProps('0', cellProps, element, index)
            this.thCom0.push(
                <Cell {...cellProps}
                    selectInfo={this.state.selectInfo} />
            )
        });

        return this.thCom0;
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
     * @param element 循环的element
     * @param index 循环的下标
     */
    private buildCellProps(lineNum: string, cellProps: any, element: any, index: number) {

        cellProps.key = index + lineNum
        cellProps.text = element + `(${lineNum}, ${index})`
        cellProps.cellKey.X = Number(lineNum)
        cellProps.cellKey.Y = index
        cellProps.mouseDownEvent = this.mouseDownEvent.bind(this)
        cellProps.mouseOverEvent = this.mouseOverEvent.bind(this)
        cellProps.mouseUpEvent = this.mouseUpEvent.bind(this)

        cellProps.isEditable = this.state.isEditable
        return cellProps;
    }

    private mouseDownEvent(cellKey: cellKey) {
        this.setState({
            selectInfo: {
                startPoint: {
                    X: cellKey.X,
                    Y: cellKey.Y
                },
                endPoint: {
                    X: cellKey.X,
                    Y: cellKey.Y
                }
            }
        })
    }

    private mouseOverEvent(cellKey: cellKey) {
        let startPoint_X = this.state.selectInfo.startPoint.X,
            startPoint_Y = this.state.selectInfo.startPoint.Y

        this.setState({
            selectInfo: {
                startPoint: {
                    X: startPoint_X,
                    Y: startPoint_Y
                },
                endPoint: {
                    X: cellKey.X,
                    Y: cellKey.Y
                }
            }
        })
    }

    private mouseUpEvent(cellKey: cellKey) {
        let startPoint_X = this.state.selectInfo.startPoint.X,
            startPoint_Y = this.state.selectInfo.startPoint.Y

        this.setState({
            selectInfo: {
                startPoint: {
                    X: startPoint_X,
                    Y: startPoint_Y
                },
                endPoint: {
                    X: cellKey.X,
                    Y: cellKey.Y
                }
            }
        })
    }

    private buildXY(selectInfo: selectInfo) {
        // let selectInfo: selectInfo = this.state.selectInfo;

        let startPoint: cellKey = {
            X: 0,
            Y: 0
        }
        let endPoint: cellKey = {
            X: 0,
            Y: 0
        }

        selectInfo.startPoint.X < selectInfo.endPoint.X
            ? startPoint.X = selectInfo.startPoint.X
            : startPoint.X = selectInfo.endPoint.X

        selectInfo.startPoint.Y < selectInfo.endPoint.Y
            ? startPoint.Y = selectInfo.startPoint.Y
            : startPoint.Y = selectInfo.endPoint.Y

        selectInfo.startPoint.X > selectInfo.endPoint.X
            ? endPoint.X = selectInfo.startPoint.X
            : endPoint.X = selectInfo.endPoint.X

        selectInfo.startPoint.Y > selectInfo.endPoint.Y
            ? endPoint.Y = selectInfo.startPoint.Y
            : endPoint.Y = selectInfo.endPoint.Y

        return {
            startPoint: startPoint,
            endPoint: endPoint
        }
    }

    renderCellList() {
        let com = this.initTh()
        return (
            <table>
                <thead className="ant-table-thead">
                    <tr>
                        {com}
                    </tr>
                </thead>
            </table>
        )
    }

    public render() {
        return this.renderCellList()
    }
}