import * as React from 'react';

// ui组件
import { Button, Row, Col, Input, Layout, Divider } from 'antd'
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
            <Col span={1}>
              <Button onClick={this.getEditorValue.bind(this)} type="primary">Primary</Button>
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
   * 获取编辑器的值
   */
  private getEditorValue() {
    var editorValue = this.editor.getEditorValue();
    var  val  =  editorValue.match(/^private (.+?);/g)
    console.log(val);
  }

  /**
   * 初始化qzz col name
   * @param dataSet 输入框的值集合
   * 
   * @return 组装后的colNames新集合
   */
  private initColNames(data: Array<dataSetModel>) {
    let colNames: string = 'var colNames';

    let dataSet = data.map(element => {
      return element.colName;
    })
    return `${colNames} = ${JSON.stringify(dataSet)}`;
  }

  /**
   * 初始化qzz col model
   * @param dataSet 输入框的值集合
   * 
   * @return 组装后的colModels新集合
   */
  private initColModels(data: Array<dataSetModel>) {
    let colModels: string = 'var colModels';

    let colModel = {
      name: '',
      dataType: ''
    };

    let dataSet: Array<any> = [];
    data.forEach(element => {
      colModel = {
        name: '',
        dataType: ''
      }
      // 中文拼音首字母
      colModel.name = hzzpyUtils.transfrom(element.colName);

      // dataType值
      element.dataType !== 'string' ? colModel.dataType = element.dataType : delete colModel.dataType;

      dataSet.push(colModel)
    })

    return `${colModels} = ${JSON.stringify(dataSet, null, '\t')}`;
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
