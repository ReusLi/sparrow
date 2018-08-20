import * as React from 'react'

import { Row } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

import { CellKey } from 'cell/interface';

export default class App extends React.Component {
    private cellList: Array<Array<CellKey>>

    private buildCellKey () {
        this.cellList = [
            [
                {X: 0, Y: 0},
                {X: 0, Y: 1},
                {X: 0, Y: 2},
                {X: 0, Y: 3},
                {X: 0, Y: 4},
                {X: 0, Y: 5}
            ],
            [
                {X: 1, Y: 0},
                {X: 1, Y: 1, colSpan: 3},
                {X: 1, Y: 4},
                {X: 1, Y: 5}
            ],
            [
                {X: 2, Y: 0},
                {X: 2, Y: 1},
                {X: 2, Y: 2},
                {X: 2, Y: 3},
                {X: 2, Y: 4},
                {X: 2, Y: 5}
            ],
            [
                {X: 3, Y: 0},
                {X: 3, Y: 1},
                {X: 3, Y: 2},
                {X: 3, Y: 3},
                {X: 3, Y: 4},
                {X: 3, Y: 5}
            ]
        ]
        return this.cellList;
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        this.cellList = this.buildCellKey()
    }

    public render() {
        return (
            <Row>

                {/* 操作cell的按钮组 */}
                <Row className="kjax-handle-btn">
                    <ButtonGroup />
                </Row>

                {/* cell panel */}
                <Row>
                    <Table cellModels={this.cellList} />
                </Row>

            </Row>
        )
    }
}