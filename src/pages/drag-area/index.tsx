import * as React from 'react'

import { Row, Col } from 'antd'

import { observer } from 'mobx-react'

import CanvasPanel from 'components/canvas-panel'

import MiniMap from 'components/mini-map'

@observer
export default class DragArea extends React.Component {
    public render () {
        return (
            <Row gutter={20}>
                <Col span={12}>
                    <CanvasPanel></CanvasPanel>
                </Col>
                <Col span={12}>
                    <MiniMap></MiniMap>
                </Col>
            </Row>
        )
    }
}