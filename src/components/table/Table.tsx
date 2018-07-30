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
    startCell: cellKey
    // mouse up 的 cell
    endCell: cellKey
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
    private thCom1: Array<any> = []

    constructor(props: props, state: state) {
        super(props);

        this.state = {
            isEditable: true,
            startPoint: {},
            endPoint: {},
            selectInfo: {
                startCell: {
                    X: 0,
                    Y: 5
                },

                endCell: {
                    X: 1,
                    Y: 1
                }
            }
        }
    }

    /**
     * 初始化表头
     */
    private initTh() {
        // cell组件props
        let cellProps;
        this.props.header.forEach((element, index) => {
            cellProps = this.getCellProps(); 
            cellProps = this.buildCellProps('0', cellProps, element, index)
            this.thCom0.push(
                <Cell {...cellProps} />
            )
            cellProps = this.getCellProps();
            cellProps = this.buildCellProps('1', cellProps, element, index)
            this.thCom1.push(
                <Cell  {...cellProps} />
            )
        });
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
            selectInfo: {
                startPoint: {
                    X: 0,
                    Y: 0
                },

                endPoint: {
                    X: 1,
                    Y: 3
                }
            }
        }

        cellProps.selectInfo = this.buildXY();

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

        return cellProps;
    }

    private buildXY() {
        let selectInfo: selectInfo = this.state.selectInfo;

        let startPoint: cellKey = {
            X: 0,
            Y: 0
        }
        let endPoint: cellKey = {
            X: 0,
            Y: 0
        }

        selectInfo.startCell.X < selectInfo.endCell.X
            ? startPoint.X = selectInfo.startCell.X
            : startPoint.X = selectInfo.endCell.X

        selectInfo.startCell.Y < selectInfo.endCell.Y
            ? startPoint.Y = selectInfo.startCell.Y
            : startPoint.Y = selectInfo.endCell.Y

        selectInfo.startCell.X > selectInfo.endCell.X
            ? endPoint.X = selectInfo.startCell.X
            : endPoint.X = selectInfo.endCell.X

        selectInfo.startCell.Y > selectInfo.endCell.Y
            ? endPoint.Y = selectInfo.startCell.Y
            : endPoint.Y = selectInfo.endCell.Y

        return {
            startPoint: startPoint,
            endPoint: endPoint
        }
    }

    public componentWillMount() {
        this.initTh()
    }

    public render() {
        return (
            <table>
                <thead className="ant-table-thead">
                    <tr>
                        {this.thCom0}
                    </tr>
                    <tr>
                        {this.thCom1}
                    </tr>
                </thead>
            </table>
        )
    }
}