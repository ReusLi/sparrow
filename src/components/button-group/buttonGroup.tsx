import * as React from 'react'

import { Button, Col, Row } from 'antd';

// mobx
import MatrixMobx from 'state/matrix/matrix'

export default class ButtonGroup extends React.Component {
    public render() {
        return (
            <Row>
                <Col span={4}>
                    <Button
                        onMouseUp={MatrixMobx.updateMatrixModel.bind(MatrixMobx)}
                    >
                        合并
                    </Button>
                </Col>
                <Col span={4}>
                    <Button>拆分</Button>
                </Col>
            </Row>
        )
    }
}