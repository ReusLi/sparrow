import * as React from 'react';

// ui组件
import { Row, Col, Input, Layout, Divider } from 'antd'
const { Content } = Layout;

// 页面组成
import LeftPart from './pages/leftPart'
import RightPart from './pages/rightPart'

// 组件
import PageHeader from './components/header';

// 工具
import hzzpyUtils from './utils/pinyin';

interface dataSetModel {
  colName: string,
  dataType: string
}

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
   * @param dataSet 输入框的值集合
   * 
   * @return 组装后的colNames新集合
   */
  private initColNames(dataSet: Array<dataSetModel>) {
    let data: string = 'var colNames';

    let colNames = dataSet.map(element => {
      return element.colName;
    })
    return `${data} = ${JSON.stringify(colNames)}`;
  }

  /**
   * 初始化qzz col model
   * @param dataSet 输入框的值集合
   * 
   * @return 组装后的colModels新集合
   */
  private initColModels(dataSet: Array<dataSetModel>) {
    let data: string = 'var colModels';

    let dataType: string;
    let colModel = {
      name: '',
      dataType: ''
    };

    let pyArray = dataSet.map(element => {
      // name
      colModel.name = hzzpyUtils.transfrom(element.colName);

      // dataType
      dataType = element.dataType;
      dataType === 'string' ?
        colModel.dataType = 'string'
        : colModel.dataType = dataType;

      return colModel
    })

    return `${data} = ${JSON.stringify(pyArray, null, '\t')}`;
  }

  /**
   * 输入框值变化后事件
   * @param dataSet 输入框的值集合
   */
  private leftPartChange(dataSet: Array<dataSetModel>) {
    const colNamesStr: string = this.initColNames(dataSet);
    const colModelsStr: string = this.initColModels(dataSet);

    const value = `${colNamesStr}\n\n${colModelsStr}`
    this.editor.setColNameValue(value);
  }
}

export default App;
