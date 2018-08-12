import * as React from 'react'

import { Button, Col, Row } from 'antd';

export default class ButtonGroup extends React.Component {
    public render() {
        return (
            <Row>
                <Col span={2}>
                    <Button>合并</Button>
                </Col>
                <Col span={2}>
                    <Button>拆分</Button>
                </Col>
            </Row>
        )
    }
}