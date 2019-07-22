import * as React from 'react'
import './index.less';

import { Layout } from 'antd'

import { observer } from 'mobx-react'

const { Header, Footer, Sider, Content } = Layout;

@observer
export default class PageScroll extends React.Component {
    public render () {
        return (
            <Layout>
                <Header>Header</Header>
                <Content>{this.props.children}</Content>
                <Footer>Footer</Footer>
            </Layout>
        )
    }
}