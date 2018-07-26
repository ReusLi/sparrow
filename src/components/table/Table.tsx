import * as React from 'react'

import Cell from 'components/cell/Cell'

interface props {
    header: Array<string>
}

interface state {
    // 表头是否可以编辑
    isEditable: boolean
}

export default class Table extends React.Component<props, state> {
    private thCom0: Array<any> = []
    private thCom1: Array<any> = []

    constructor(props: props, state: state) {
        super(props);

        this.state = {
            isEditable: true
        }
    }

    private initTh() {
        let linekey = {
            key: '',
            text: '',
            cellKey: {
                row: 0,
                col: 0
            },
            selectInfo: {
                startCell: {
                    row: 0,
                    col: 0
                },

                endCell: {
                    row: 1,
                    col: 3
                }
            }
        }

        this.props.header.forEach((element, index) => {
            linekey.key = index + '0'
            linekey.text = element + `(0, ${index})`
            linekey.cellKey.row = 0
            linekey.cellKey.col = index
            this.thCom0.push(
                <Cell {...linekey} />
            )
            linekey.key = index + '1'
            linekey.text = element + `(1, ${index})`
            linekey.cellKey.row = 1
            linekey.cellKey.col = index
            this.thCom1.push(
                <Cell  {...linekey} />
            )
        });
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