import * as React from 'react'

import { Input, Row } from 'antd'

import './index.css'

class LeftPart extends React.Component<LeftPagesProps, LeftPagesStates> {

    constructor(props: LeftPagesProps, state: LeftPagesStates) {
        super(props);
        this.state = {
            placeholder: '输入colNames, 然后按回车',
            inputListNum: [{}, {}]
        };
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
        const len = this.state.inputListNum.length,
            placeholder = this.state.placeholder,
            enterCallback = this.enterCallback;

        let result = [];

        for (let index = 0; index < len; index++) {
            result.push(
                <Row key={index} className="row-style">
                    <Input key={index}
                        placeholder={placeholder}
                        onPressEnter={enterCallback.bind(this, index)}
                    />
                </Row>
            )
        }

        return result;
    }

    private enterCallback (index: number, e: object) {
        console.log(e)
    }
}

interface LeftPagesProps {
}

interface LeftPagesStates {

    /** 输入框提示语 */
    placeholder: string,

    /** 输入框数量 */
    inputListNum: Array<Object>
}

export default LeftPart;