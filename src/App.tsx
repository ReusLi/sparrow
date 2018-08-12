import * as React from 'react'

import Table from 'components/table/table';

export default class App extends React.Component {
    private header: Array<string> = []

    public componentWillMount() {
        for (let i = 1, len = 10; i <= len; i++) {
            this.header.push(`表头`)
        }
    }
    public render() {
        return (
            <Table/>
        )
    }
}