import * as React from 'react'

// ui组件
import { Button, Col, Input, Icon, Radio, Row } from 'antd'

const RadioGroup = Radio.Group;

import './index.css'

// 自定义组件
import AttrComponent from 'components/attrComponent'

// context
import { AttrContext } from 'context/AttrContext'

// 属性配置
import attributeConfig from 'pages/leftPart/attributeConfig'

interface props {
    /** 输入框值变动后回调事件 */
    leftPartChange: Function
}

interface states {

    /** 输入框提示语 */
    placeholder: string

    /** 当前foucus的input框下标 */
    inputFocusIndex: number

    /** 输入框组件集合 */
    inputComp: Array<any>

    /** 列表模型 */
    listModel: Array<listModel>

    /** list 模板 */
    listTemplate: any

    onDataTypeChange: any
}

/** 列表模型 */
interface listModel {
    /** uuid */
    uuid: string

    colNameRef: any

    /** input输入框值 */
    colName: string

    /** radio输入框值 */
    dataType: string

    /** Array key */
    [key: string]: string

}

class LeftPart extends React.Component<props, states> {
    /** 输入框的HTML元素集合 */
    private inputHTMLElements: Array<any> = [];

    /** radio的HTML元素集合 */
    private radioHTMLElements: Array<any> = [];

    /** dataType选项值 */
    private dataTypeOption = ['string', 'number', 'date'];

    private listTemplate: any;

    constructor(props: props, state: states) {
        super(props);

        this.state = {
            placeholder: '输入colNames, 然后按回车',
            inputFocusIndex: 0,
            inputComp: [],
            listModel: [{
                uuid: new Date().getTime().toString(),
                colName: '',
                colNameRef: null,
                dataType: 'string'
            }],
            listTemplate: null,

            //context method
            onDataTypeChange: this.onDataTypeChange.bind(this)
        };
    }
    componentWillMount() {
        this.getListTemplate();
    }

    componentDidMount() {
        setTimeout(() => {
            this.state.listModel[0].colNameRef.focus();
        }, 100)
    }

    public render() {
        return (
            <div>
                {this.state.listTemplate}
            </div>
        )
    }

    /** 
     * 初始化列表模型
     */
    private addListModel() {
        const model = {
            uuid: new Date().getTime().toString(),
            colName: '',
            colNameRef: "",
            dataType: 'string'
        }

        let listModel = this.state.listModel;

        listModel.push(model);

        this.setState({
            listModel: listModel
        })

        this.getListTemplate();
    }

    /** 
     * 初始化列表模板
     */
    private getListTemplate() {
        const listTemplate = this.renderList();
        this.setState({
            listTemplate: listTemplate
        })
    }

    /** 
     * 渲染输入框组件
     */
    private renderList() {
        let result: Array<any> = [],
            // 属性模板
            AttributeTemplate: any,
            UUID: string = '';


        this.state.listModel.forEach((model, index) => {
            UUID = model.uuid;
            
            // 获取属性模板
            AttributeTemplate = this.getAttributeTemplate(UUID);

            /**
             * 每一行的html template
             */
            result.push(
                <Row key={UUID} className='row-style'>
                    <Input
                        style={{ width: '80%', margin: '0 10px' }}
                        ref={(element) => {
                            model.colNameRef = element;
                        }}
                        placeholder={this.state.placeholder}
                        onClick={this.onColNameInputClick.bind(this, index)}
                        onPressEnter={this.onColNameInputPressEnter.bind(this, index + 1)}
                        onKeyDown={this.onColNameInputKeyDown.bind(this)}
                        onChange={this.onColNameInputChange.bind(this, UUID)}
                    />
                    <Button
                        shape='circle'
                        type='danger'
                        size='default'
                        onClick={this.onDelBtnClick.bind(this, UUID)}>
                        <Icon type='delete' />
                    </Button>

                    {/* 属性 */}
                    {AttributeTemplate}

                </Row>
            )
        })
        return result;
    }

    /**
     * 根据属性配置, 初始化每一行的属性数据
     * @param UUID 每一行的UUID, 用于属性值change时更新数据
     * @return {Array}
     */
    private getAttributeTemplate(UUID: string) {
        let AttributeTemplate: Array<any> = [];
        /**
         * 根据属性配置, 初始化每一行的属性数据
         */
        attributeConfig.forEach((attribute) => {
            AttributeTemplate.push(
                <Row key={UUID} className='attr-row-style'>
                    <Col offset={1} span={23}>
                        <AttrContext.Provider value={this.state}>
                            <AttrComponent
                                UUID={UUID}
                                labelName={attribute.attributeName}
                                defaultValue={attribute.defaultValue}
                                dataTypeOption={attribute.option}
                            />
                        </AttrContext.Provider>
                    </Col>
                </Row>
            )
        })
        return AttributeTemplate;
    }

    /**
     * delete one of list model item
     * @param UUID listModel item`s uuid
     */
    private onDelBtnClick(UUID: string) {
        let listModel = this.state.listModel;
        if (listModel.length <= 1) {
            return false;
        }
        listModel = this.state.listModel.filter((model) => model.uuid !== UUID);

        this.setState({
            listModel: listModel
        }, () => {
            this.getListTemplate();
            this.combine();
        })
    }
    /**
     * 
     * @param UUID model item`s uuid
     * @param e event
     */
    public onDataTypeChange(UUID: string, value: any) {
        const key = 'dataType';

        this.modifyModelByUUID(UUID, key, value);
    }
    /**
     * 把input list的数据组装并返回
     */
    private combine() {
        let combineData = this.state.listModel.map((model) => {
            return {
                colName: model.colName,
                dataType: model.dataType
            }
        })

        this.props.leftPartChange(combineData);
    }
    /**
     * input click event
     * @param index 输入框序号
     * @param e event object
     */
    private onColNameInputClick(index: number, e: any) {
        // 点击input时,更新当前focus的input序号
        this.setState({
            inputFocusIndex: index
        })
    }
    /**
     * input press enter event
     * @param e event object
     */
    private onColNameInputPressEnter(colNameIndex: number, e: object) {
        const listModelLen: number = this.state.listModel.length;
        // 在最后一个input回车时, 自动新增一个input组件并focus
        if (colNameIndex === listModelLen) {
            this.addListModel();
        }

        setTimeout(() => {
            this.onColNameInputKeyDown({
                keyCode: 40
            })
        }, 100)

    }
    /**
     * input key down event
     * @param e event object
     */
    private onColNameInputKeyDown(e: any) {
        const key: number = e.keyCode,
            maxLen: number = this.state.listModel.length;

        let focusIndex: number = this.state.inputFocusIndex;

        // 向上键
        if (key === 38 && focusIndex > 0) {
            focusIndex--;
        }
        // 向下键
        else if (key === 40 && focusIndex < maxLen - 1) {
            focusIndex++;
        }
        // 其余情况返回
        else {
            return false;
        }

        this.state.listModel[focusIndex].colNameRef.focus();

        this.setState({
            inputFocusIndex: focusIndex
        })
    }
    /**
     * 
     * @param UUID model item`s uuid
     * @param e event
     */
    private onColNameInputChange(UUID: string, e: any) {
        const key = 'colName',
            value = e.currentTarget.value;

        this.modifyModelByUUID(UUID, key, value);
    }

    /**
     * modify modelItem by item`s uuid
     * @param UUID modeItem`s uuid
     * @param key attribute`s name
     * @param value attribute`s value
     */
    private modifyModelByUUID(UUID: string, key: string, value: any) {
        let listModel = this.state.listModel;

        listModel.map((model, index) => {
            if (model.uuid === UUID) {
                model[key] = value
            }
        })

        this.setState({
            listModel: listModel
        })

        this.combine();
    }
}



export default LeftPart;