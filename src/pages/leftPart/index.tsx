import * as React from 'react'

import { Input, Row } from 'antd'

import './index.css'

class LeftPart extends React.Component<LeftPagesProps, LeftPagesStates> {
    /** 输入框的HTML元素集合 */
    private inputHTMLElement: Array<any> = [];

    constructor(props: LeftPagesProps, state: LeftPagesStates) {
        super(props);
        this.state = {
            placeholder: '输入colNames, 然后按回车',
            inputListNum: [{}, {}],
            inputFocusIndex: 0
        };
    }

    componentDidMount() {
        this.inputHTMLElement[0].focus();
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
            refVal = '';

        for (let index = 0; index < len + 10; index++) {
            result.push(
                <Row key={index} className="row-style">
                    <Input
                        ref={(input) => { this.inputHTMLElement.push(input) }}
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
        this.onKeyDown({
            keyCode: 40
        })
    }

    private onKeyDown(e: any) {
        const key: number = e.keyCode,
            maxLen: number = this.inputHTMLElement.length;

        let focusIndex: number = this.state.inputFocusIndex;

        // 向上键
        if (key === 38 && focusIndex !== 0) {
            this.inputHTMLElement[focusIndex - 1].focus();
            focusIndex--;
        } 
        // 向下键
        else if (key === 40 && focusIndex !== maxLen) {
            this.inputHTMLElement[focusIndex + 1].focus();
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

    /** 当前foucus的input框下标 */
    inputFocusIndex: number
}

export default LeftPart;