import * as React from 'react'

import { Row, Col } from 'antd'

import { observer } from 'mobx-react'

@observer
export default class Home extends React.Component {
    public render () {
        return (
            <Row gutter={20}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                </Col>
            </Row>
        )
    }
}