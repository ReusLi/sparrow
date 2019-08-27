import * as React from 'react'

import { Layout } from 'antd'

import { observer } from 'mobx-react'

import { Nav } from 'components/nav'


const subMenu = [
    {
        id: 1,
        text: '首页'
    }, {
        id: 2,
        text: '文档'
    }, {
        id: 3,
        text: '帮助'
    }
]
@observer
export default class Home extends React.Component {
    public render () {
        const { children } = this.props;
        return (
            <Nav subMenu={subMenu} />
        )
    }
}