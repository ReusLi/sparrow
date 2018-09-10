import * as React from 'react'

import Matrix from 'components/matrix/matrix'

interface AppState {

}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps, state: AppState) {
        super(props);
    }

    componentWillMount() {

    }

    public render() {
        return (
            <Matrix />
        )
    }
}