import * as React from 'react'

import { Button, Col, Row } from 'antd';

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore'

// matrixStore mobx
import cellStore from 'store/cell/cellStore'

export default class ButtonGroup extends React.Component {
    public render() {
        return (
            <Row>
                <Col span={4}>
                    <Button
                        onMouseUp={matrixStore.mergeCells.bind(matrixStore)}
                    >
                        合并
                    </Button>
                </Col>
                <Col span={4}>
                    <Button
                        onMouseUp={matrixStore.disMergeCell.bind(matrixStore)}
                    >拆分</Button>
                </Col>
            </Row>
        )
    }

    private disMerge() {
        cellStore
    }
}