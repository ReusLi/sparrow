import * as React from 'react'

interface props {
    header: Array<string>
}

interface states {
    header: Array<string>
}

export default class GridHeader extends React.Component<props, states> {
    private thCom: Array<any> = []

    constructor(props: props, state: states) {
        super(props);
    }

    private header() {

    }

    public componentWillMount() {
        this.props.header.forEach((element, index) => {
            this.thCom.push(
                <th key={index}>{element}</th>
            )
        });
    }

    public render() {
        return (
            <div>
                <table data-border={1}>
                    <thead>
                        <tr>
                            {this.thCom}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}