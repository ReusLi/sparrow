import * as React from 'react'

import GridHeader from './components/GridHeader';

export default class App extends React.Component {
    private header: Array<string> = []

    public componentWillMount() {
        for(let i = 1, len = 10; i <= len; i++) {
            this.header.push(`表头${i}`)
        }
    }
    public render() {
        return (
            <div>
                <GridHeader header={this.header}/>
            </div>
        )
    }
}