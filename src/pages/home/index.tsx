import * as React from 'react'

import { Layout } from 'antd'

import { observer } from 'mobx-react'

import { Nav } from 'components/nav'

@observer
export default class Home extends React.Component {
    public render () {
        const { children } = this.props;
        return (
            <Nav />
        )
    }
}