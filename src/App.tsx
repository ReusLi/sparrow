import * as React from 'react';

import { Row, Col, Input, Layout, Divider } from 'antd'
const { Content } = Layout;

import LeftPart from './pages/leftPart'
import RightPart from './pages/rightPart'

import PageHeader from './components/header';

class App extends React.Component {
  private editor: any;

  private inp: any;

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
              <LeftPart leftPartChange={this.leftPartChange.bind(this)} />
            </Col>
            {/* 分割线 */}
            <Col span={1}>
              <Divider type="vertical" />
            </Col>
            {/* 右侧 editor area */}
            <Col span={15}>
              <RightPart ref={(editor: any) => this.editor = editor} />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

  /**
   * 初始化qzz col name
   * @param inputValue 输入框的值集合
   * 
   * @return 组装后的colname新集合
   */
  private initColNames(inputValue: Array<string>) {
    let data: string = 'var colNames';
    
    return `${data} = ${JSON.stringify(inputValue)}`;
  }

  /**
   * 输入框值变化后事件
   * @param inputValue 输入框的值集合
   */
  private leftPartChange(inputValue: Array<string>) {
    const colNameStr: string = this.initColNames(inputValue);
    this.editor.setColNameValue(colNameStr);
  }
}

export default App;
