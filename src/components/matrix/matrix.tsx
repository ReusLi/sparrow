import * as React from 'react'

import { Row } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

import { observer } from 'mobx-react';

// context
import { MatrixContext } from 'context/matrixContext'

// interface
import { MatrixProps, CellKey, SelectInfo } from './interface'

// mobx
import MatrixMobx from 'state/matrix/matrix'

@observer
export default class Matrix extends React.Component<MatrixProps> {

    public render() {
        return (
            <Row>

                {/* 操作cell的按钮组 */}
                <Row className="kjax-handle-btn">
                    <ButtonGroup />
                </Row>

                {/* cell panel */}
                <Row>
                    <MatrixContext.Provider
                        value={
                            {
                                onCellMouseDown: MatrixMobx.onCellMouseDown.bind(MatrixMobx),
                                onCellMouseUp: MatrixMobx.onCellMouseUp.bind(MatrixMobx)
                            }
                        }>
                        <Table cellModels={MatrixMobx.cellModels} />
                    </MatrixContext.Provider>
                </Row>

            </Row>
        )
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        MatrixMobx.updateMatrixModel()
    }
}