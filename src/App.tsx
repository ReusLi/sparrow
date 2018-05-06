import * as React from 'react';

import { Row, Col, Input, Layout, Divider } from 'antd'
const { Content } = Layout;

import LeftPart from './pages/leftPart'

import PageHeader from './components/header';

class App extends React.Component {
  public render() {
    return (
      <Layout className="pageLayout">
        {/* 头部 */}
        <PageHeader />
        {/* content */}
        <Content>
          <Row>
            {/* 左侧input list */}
            <Col span={8}>
              <LeftPart />
            </Col>
            {/* 分割线 */}
            <Col span={1}>
              <Divider type="vertical" />
            </Col>
            {/* 右侧 editor area */}
            <Col span={15}>
              RightPart
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
