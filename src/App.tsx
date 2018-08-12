import * as React from 'react'

import { Col, Row } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

export default class App extends React.Component {
    public render() {
        return (
            <Row>
                <Row className="kjax-handle-btn">
                    <ButtonGroup />
                </Row>
                <Row>
                    <Table />
                </Row>
            </Row>
        )
    }
}