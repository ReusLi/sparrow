import * as React from 'react'

import { Layout } from 'antd'

import { observer } from 'mobx-react'

import { PageScroll } from 'components/page-scroll'

@observer
export default class Home extends React.Component {
    public render () {
        const { children } = this.props;
        return (
            <PageScroll/>
        )
    }
}