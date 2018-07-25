import * as React from 'react'

// 样式
import './cell.css'

interface props {
    text: string
}

interface state {
    // 表头是否可以编辑
    isEditable: boolean
}

export default class Cell extends React.Component<props, state> {
    private thCom: Array<any> = []

    constructor(props: props, state: state) {
        super(props);

        this.state = {
            isEditable: true
        }
    }

    public render() {
        return (
            <th
                className="custom-cell"
                contentEditable={this.state.isEditable}
            >
                {this.props.text}
            </th>
        )
    }
}