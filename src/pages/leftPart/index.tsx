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
        const CST = this.renderInputComponent();
        return (
            <div>
                {CST}
            </div>
        )
    }

    public renderInputComponent() {
        const len = this.state.inputListNum.length,
            placeholder = this.state.placeholder;

        let result = [];

        for (let i = 0; i < len; i++) {
            result.push(
                <Row key={i} className="row-style">
                    <Input key={i} placeholder={placeholder} />
                </Row>
            )
        }

        return result;
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