import * as React from 'react'

import { Input, Row } from 'antd'

import './index.css'

class LeftPart extends React.Component<LeftPagesProps, LeftPagesStates> {

    constructor(props: LeftPagesProps, state: LeftPagesStates) {
        super(props);
        this.state = {
            placeholder: '输入colNames, 然后按回车',
            inputListNum: [{}, {}],
            inputHTMLElement: [],
            inputFocusIndex: 0
        };
    }

    componentDidMount() {
        this.state.inputHTMLElement[0].focus();
    }

    public render() {
        const placeholder = this.state.placeholder;
        const InputComp = this.renderInputComponent();
        return (
            <div>
                {InputComp}
            </div>
        )
    }

    private renderInputComponent() {
        const len = this.state.inputListNum.length;

        let result = [],
            inputHTMLElement = [],
            refVal = '';

        for (let index = 0; index < len + 10; index++) {
            result.push(
                <Row key={index} className="row-style">
                    <Input
                        ref={(input) => { this.state.inputHTMLElement.push(input) }}
                        // ref={(input) => { this.textInput = input; }}
                        placeholder={this.state.placeholder}
                        onPressEnter={this.onPressEnter.bind(this, index)}
                        onKeyDown={this.onKeyDown.bind(this)}
                    />
                </Row>
            )
        }

        return result;
    }

    private onPressEnter(index: number, e: object) {
        console.log(e)
    }

    private onKeyDown(e: any) {
        const key: number = e.keyCode,
            maxLen: number = this.state.inputHTMLElement.length;

        let focusIndex: number = this.state.inputFocusIndex;

        // 向上键
        if (key === 38 && focusIndex !== 0) {
            this.state.inputHTMLElement[focusIndex - 1].focus();
            focusIndex--;
        } 
        // 向下键
        else if (key === 40 && focusIndex !== maxLen) {
            this.state.inputHTMLElement[focusIndex + 1].focus();
            focusIndex++;
        }

        this.setState({
            inputFocusIndex: focusIndex
        })
    }
}

interface LeftPagesProps {
}

interface LeftPagesStates {

    /** 输入框提示语 */
    placeholder: string,

    /** 输入框数量 */
    inputListNum: Array<Object>,

    /** 输入框HTML对象 */
    inputHTMLElement: Array<any>

    /** 当前foucus的input框下标 */
    inputFocusIndex: number
}

export default LeftPart;