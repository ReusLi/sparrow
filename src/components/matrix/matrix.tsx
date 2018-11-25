import * as React from 'react'

import { Row, Input } from 'antd';

import ButtonGroup from 'components/button-group/buttonGroup'
import Table from 'components/table/table';

import { observer } from 'mobx-react';

// interface
import { MatrixProps, CellKey, SelectInfo } from './interface'

// matrixStore mobx
import matrixStore from 'store/matrix/matrixStore'

@observer
export default class Matrix extends React.Component<MatrixProps> {

    public render() {
        return (
            <Row>
                {/* debug数据显示 */}
                <Row className="kjax-handle-btn">
                    <Input 
                        type='textarea' 
                        size='large'
                        // disabled={true}
                        onChange={this.onChange}
                    />
                </Row>
                {/* {matrixStore.hideCellList.length} */}
                {/* 操作cell的按钮组 */}
                <Row className="kjax-handle-btn">
                    <ButtonGroup />
                </Row>

                {/* cell panel */}
                <Row>
                    <Table cellModels={matrixStore.cellModels} />
                </Row>

            </Row>
        )
    }

    /**
     * 第一次render前触发
     */
    componentWillMount() {
        matrixStore.initMatrixModel()
    }

    private onChange(e: any) {
        matrixStore.updateTestV(e.target.value)
    }
}