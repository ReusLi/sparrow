import * as React from 'react'
import './index.less';

import { Row, Icon } from 'antd';

export default class Home extends React.Component {
    public render () {
        return (
            <Row>
                <Icon type="notification" />
                <Icon type="question-circle" />
                <Icon type="edit" />
            </Row>
            // <TableGroup tableList={tableList} />
        )
    }
}