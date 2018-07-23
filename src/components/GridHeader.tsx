import * as React from 'react'

export default class GridHeader extends React.Component {
    // constructor(props: props, state: states) {
    //     super(props);
    // }

    public render() {
        return (
            <div>
                <table data-border={1}>
                    <tbody>
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
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <th>月份</th>
                            <th>存款</th>
                            <th rowSpan={3}>假日存款</th>
                        </tr>
                        <tr>
                            <td>一月</td>
                            <td>3000 元</td>
                        </tr>
                        <tr>
                            <td>二月</td>
                            <td>5000 元</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}