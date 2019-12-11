import * as React from 'react'
import './index.less';

import { Row, Icon, Tooltip } from 'antd';

const openUrl = (url: string) => {
    window.open(url);
}
export default class Home extends React.Component {

    public render () {
        return (
            <Row className="entry-icon">
                <Tooltip title="message">
                    <Icon type="notification" onClick={() => {
                        openUrl('https://www.baidu.com')
                    }} />
                </Tooltip>
                <Tooltip title="question">
                    <Icon type="question-circle" />
                </Tooltip>
                <Tooltip title="feedback">
                    <Icon type="edit" />
                </Tooltip>
            </Row>
            // <TableGroup tableList={tableList} />
        )
    }
}