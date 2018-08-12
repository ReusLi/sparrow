import * as React from 'react'

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

export default class App extends React.Component {
    public render() {
        return (
            <div>
                <ButtonGroup />
                <Table />
            </div>
        )
    }
}