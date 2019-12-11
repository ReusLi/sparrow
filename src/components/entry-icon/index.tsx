import * as React from 'react'
import './index.less';

import { Row, Icon } from 'antd';

const openUrl = (url: string) => {
    window.open(url);
}
export default class Home extends React.Component {

    public render () {
        return (
            <Row className="entry-icon">
                <Icon type="notification" onClick={() => {
                    openUrl('https://www.baidu.com')
                }} />
                <Icon type="question-circle" />
                <Icon type="edit" />
            </Row>
            // <TableGroup tableList={tableList} />
        )
    }
}