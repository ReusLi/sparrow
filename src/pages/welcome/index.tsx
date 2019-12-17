import * as React from 'react'

import { Layout, Row } from 'antd'

import { observer } from 'mobx-react'

import { Nav } from 'components/nav'
import { Banner } from './banner'

import { TableGroup } from 'components/table-radio-group'

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
        return (
            <div>
                <Row>
                    <Nav subMenu={subMenu}></Nav>
                </Row>
                <Row>
                    <Banner></Banner>
                </Row>
            </div>
        )
    }
}