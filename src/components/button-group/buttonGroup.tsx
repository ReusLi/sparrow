import * as React from 'react'

import { Button, Col, Row } from 'antd';

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore'

import antdTableStore from 'store/antdTableStore'
import { CellKey } from 'components/matrix/interface';

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

                <Col span={4}>
                    <Button
                        onMouseUp={this.addRow.bind(this)}
                    >加行</Button>
                </Col>

                <Col span={4}>
                    <Button
                        onMouseUp={this.addCol.bind(this)}
                    >加列</Button>
                </Col>
                <Col span={4}>
                    <Button
                        onMouseUp={antdTableStore.syncTableColumns.bind(antdTableStore)}
                    >生成</Button>
                </Col>
            </Row>
        )
    }

    private addRow() {
        let cellModels = matrixStore.cellModels,
            newRow: Array<CellKey> = []

        const X = cellModels[0].length - 1

        cellModels[0].forEach((item, index) => {
            const cell: CellKey = {
                X: X,
                Y: index,
                rowSpan: 1,
                colSpan: 1,
                isHide: false,
                text: `未命名`
            }
            newRow.push(cell)
        })

        cellModels.push(newRow)

        matrixStore.setCellModels(cellModels)
    }

    private addCol() {
        let cellModels = matrixStore.cellModels

        cellModels.map((row, index) => {
            const cell: CellKey = {
                X: index,
                Y: row.length,
                rowSpan: 1,
                colSpan: 1,
                isHide: false,
                text: `未命名`
            }
            row.push(cell)
        })

        matrixStore.setCellModels(cellModels)
    }
}