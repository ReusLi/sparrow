import * as React from 'react'

import Matrix from 'components/matrix/matrix'

import Parse5 from 'utils/parse5'

interface AppState {

}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps, state: AppState) {
        super(props);
    }
    
    componentWillMount () {
        this.paser5spec()
    }

    /**
     * 测试Parse5模块
     */
    paser5spec() {
        let cls = new Parse5()
        
        let r1 = cls.parse('<!DOCTYPE html><html><head></head><body>Hi there!</body></html>')
        let r2 = cls.serialize(r1)

        console.log(r1)
        console.log(r2)
    }

    public render() {
        return (
            <Matrix />
        )
    }
}