import * as React from 'react'

interface props {

}

interface states {
    
}

export default class GridHeader extends React.Component {
    constructor(props: props, state: states) {
        super(props);
    }

    public render() {
        return (
            <div>
                <table data-border={1}>
                    <thead>
                        <tr>
                            <th colSpan={2}>Company in USA</th>
                        </tr>
                        <tr>
                            <td>Apple, Inc.</td>
                            <td>1 Infinite Loop Cupertino, CA 95014</td>
                        </tr>
                        <tr>
                            <td>Google, Inc.</td>
                            <td>1600 Amphitheatre Parkway Mountain View, CA 94043</td>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}