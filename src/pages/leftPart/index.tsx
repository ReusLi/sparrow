import * as React from 'react'

// ui组件
import { Input, Row } from 'antd'

import './index.css'


interface props {
    /** 输入框值变动后回调事件 */
    leftPartChange: Function
}

interface states {

    /** 输入框提示语 */
    placeholder: string,

    /** 输入框数量 */
    inputListNum: Array<Object>,

    /** 当前foucus的input框下标 */
    inputFocusIndex: number,

    /** 输入框组件集合 */
    inputComp: Array<any>
}

class LeftPart extends React.Component<props, states> {
    /** 输入框的HTML元素集合 */
    private inputHTMLElements: Array<any> = [];

    constructor(props: props, state: states) {
        super(props);
        this.state = {
            placeholder: '输入colNames, 然后按回车',
            inputListNum: [{}, {}],
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
     */
    private renderInputComponent(compIndex: number) {
        let result: Array<any> = [];
        this.inputHTMLElements = [];
        for (let index = 0; index <= compIndex; index++) {
            result.push(
                <Row key={`inputComp_${index}`} className='row-style' >
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
                </Row>
            )
        }
        return result;
    }
    /** 
     * 把input list的数据组装并返回
     */
    private combine() {
        let result = this.inputHTMLElements.map(element => {
            return element.input.value;
        })
        this.props.leftPartChange(result);
    }
    /**
     * 点击事件
     * @param index 输入框序号
     * @param e 事件对象
     */
    private onClick(index: number, e: any) {
        // 点击input时,更新当前focus的input序号
        this.setState({
            inputFocusIndex: index
        })
    }
    /**
     * 回车事件
     * @param e 事件对象
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
     * 键盘按下事件
     * @param e 事件对象
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
     * 输入框chagne事件
     * @param e 事件对象
     */
    private onChange(e: any) {
        this.combine();
    }
}

export default LeftPart;