import * as React from 'react'

import { Input } from 'antd'

class LeftPart extends React.Component<LeftPagesProps, LeftPagesStates> {

    constructor(props: LeftPagesProps, state: LeftPagesStates) {
        super(props);
        this.state = {
            placeholder: '输入colName, 然后按回车'
        };
    }

    public render() {
        return (
            <Input placeholder={this.state.placeholder}/>
        )
    }
}

interface LeftPagesProps {
}

interface LeftPagesStates {
    placeholder: string
}

export default LeftPart;