import * as React from 'react'

import { Row } from 'antd'

import { observer } from 'mobx-react'

import { Nav } from 'components/nav'
import { Banner } from './banner'

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