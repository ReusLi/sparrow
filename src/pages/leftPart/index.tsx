import * as React from "react"

// ui组件
import { Input, Radio, Row } from "antd"

const RadioGroup = Radio.Group;

import "./index.css"


interface props {
    /** 输入框值变动后回调事件 */
    leftPartChange: Function
}

interface states {

    /** 输入框提示语 */
    placeholder: string,

    /** 当前foucus的input框下标 */
    inputFocusIndex: number,

    /** 输入框组件集合 */
    inputComp: Array<any>
}

class LeftPart extends React.Component<props, states> {
    /** 输入框的HTML元素集合 */
    private inputHTMLElements: Array<any> = [];

    /** radio的HTML元素集合 */
    private radioHTMLElements: Array<any> = [];

    /** dataType选项值 */
    private dataTypeOption = ["string", "number", "date"];

    constructor(props: props, state: states) {
        super(props);
        this.state = {
            placeholder: "输入colNames, 然后按回车",
            inputFocusIndex: 0,
            inputComp: []
        };
    }
    componentWillMount() {
        const compIndex: number = 0;
        this.setState({
            inputComp: this.renderInputComponent(compIndex)
        })
    }

    componentDidMount() {
        this.inputHTMLElements[0].focus();
    }

    public render() {
        const placeholder = this.state.placeholder;
        return (
            <div>
                {this.state.inputComp}
            </div>
        )
    }

    /** 
     * 渲染输入框组件
     * 
     * @param compIndex 要渲染的组件数量
     */
    private renderInputComponent(compIndex: number) {
        let result: Array<any> = [];
        this.inputHTMLElements = [];
        this.radioHTMLElements = [];
        for (let index = 0; index <= compIndex; index++) {
            result.push(
                <Row key={"inputComp_" + index} className="row-style">
                    <Input
                        ref=
                        {
                            (input) => {
                                /**
                                 * input有可能是null, 具体原因看:
                                 * https://github.com/facebook/react/issues/7267
                                 * https://github.com/facebook/react/issues/7272
                                 */
                                input === null ? null : this.inputHTMLElements.push(input)
                            }
                        }
                        placeholder={this.state.placeholder}
                        onClick={this.onClick.bind(this, index)}
                        onPressEnter={this.onPressEnter.bind(this)}
                        onKeyDown={this.onKeyDown.bind(this)}
                        onChange={this.onChange.bind(this)}
                    />
                    <Row className="attr-row-style">
                        <span>dataType:</span>
                        <RadioGroup
                            size="small"
                            ref=
                            {
                                (radioGroup) => {
                                    /**
                                     * 此处写法同上inputHTMLElements
                                     */
                                    radioGroup === null ? null : this.radioHTMLElements.push(radioGroup)
                                }
                            }
                            defaultValue="string"
                            options={this.dataTypeOption}
                            onChange={this.handleRadioChange.bind(this, index)}
                        />
                    </Row>
                </Row>
            )
        }
        return result;
    }
    /**
     * radio group chagne event
     * @param index radioGroup的序号
     * @param e 
     */
    private handleRadioChange(index: number | boolean, e: any) {
        this.combine(index, e.target.value);
    }
    /**
     * 把input list的数据组装并返回
     * @param radioSort radioGroup 最近change的组件的序号
     * @param radioValue radioGroup 最近change的组件的值
     */
    private combine(radioSort: number | boolean, radioValue: string | boolean) {
        let colName: string = "",
            dataType: string = "";

        // 根据input组件初始化colName
        let result = this.inputHTMLElements.map((element, index) => {
            colName = element.input.value;
            return {
                colName: colName,
                dataType: null
            }
        })

        // 根据RadioGroup组件初始化dataType
        result = result.map((element, index) => {
            dataType = this.radioHTMLElements[index].state.value;
            if (dataType !== "") {
                element.dataType = dataType;
            }
            if (index === radioSort) {
                element.dataType = radioValue;
            }
            return element;
        })

        // dataType为string || ""的过滤掉dataType属性
        const illegalValue: Array<string> = ["", "string"];
        result.map((element, index) => {
            if (illegalValue.indexOf(element.dataType) !== -1) {
                delete result[index].dataType;
            }
        })

        this.props.leftPartChange(result);
    }
    /**
     * input click event
     * @param index 输入框序号
     * @param e event object
     */
    private onClick(index: number, e: any) {
        // 点击input时,更新当前focus的input序号
        this.setState({
            inputFocusIndex: index
        })
    }
    /**
     * input press enter event
     * @param e event object
     */
    private onPressEnter(e: object) {
        const inputNum: number = this.inputHTMLElements.length;
        const focusIndex: number = this.state.inputFocusIndex;

        // 在最后一个input回车时, 自动新增一个input组件并focus
        if (inputNum === (focusIndex + 1)) {
            const compIndex = this.state.inputComp.length
            this.setState({
                inputComp: this.renderInputComponent(compIndex)
            })
        }

        setTimeout(() => {
            this.onKeyDown({
                keyCode: 40
            })
        }, 100)

    }
    /**
     * input key down event
     * @param e event object
     */
    private onKeyDown(e: any) {
        const key: number = e.keyCode,
            maxLen: number = this.inputHTMLElements.length;

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

        this.inputHTMLElements[focusIndex].focus();
        this.setState({
            inputFocusIndex: focusIndex
        })
    }
    /**
     * input chagne event
     * @param e event object
     */
    private onChange(e: any) {
        this.combine(false, false);
    }
}

export default LeftPart;