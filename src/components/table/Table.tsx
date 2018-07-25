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
    private thCom: Array<any> = []

    constructor(props: props, state: state) {
        super(props);

        this.state = {
            isEditable: true
        }
    }

    private initTh() {
        this.props.header.forEach((element, index) => {
            this.thCom.push(
                <Cell key={index} text={element}/>
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
                        {this.thCom}
                    </tr>
                </thead>
            </table>
        )
    }
}