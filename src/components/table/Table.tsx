import * as React from 'react'

import Cell from 'components/cell/Cell'

interface cellKey {
    X: number,
    Y: number
}

interface selectInfo {
    startCell: cellKey
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
                    Y: 0
                },

                endCell: {
                    X: 1,
                    Y: 3
                }
            }
        }
    }

    private initTh() {
        let linekey = {
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

        linekey.selectInfo = this.buildXY();

        this.props.header.forEach((element, index) => {
            linekey.key = index + '0'
            linekey.text = element + `(0, ${index})`
            linekey.cellKey.X = 0
            linekey.cellKey.Y = index
            this.thCom0.push(
                <Cell {...linekey} />
            )
            linekey.key = index + '1'
            linekey.text = element + `(1, ${index})`
            linekey.cellKey.X = 1
            linekey.cellKey.Y = index
            this.thCom1.push(
                <Cell  {...linekey} />
            )
        });
    }

    private buildXY() {
        let selectInfo: selectInfo = this.state.selectInfo;

        let startPoint = {
            X: 0,
            Y: 0
        }
        let endPoint = {
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
                    </tr>>
                </thead>
            </table>
        )
    }
}