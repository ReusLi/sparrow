import * as React from 'react'


// ui组件
import { Radio } from 'antd'

const RadioGroup = Radio.Group;

interface states {

}

interface props {
    /** UUID */
    UUID: string

    /** 属性名 */
    labelName: string

    /** 枚举选项 */
    dataTypeOption: Array<any>

    /** 默认值 */
    defaultValue: string | number

    /** change event */
    // onDataTypeChange: Function

    parent: any
}

class AttrComponent extends React.Component<props, states> {
    constructor(props: props, state: states) {
        super(props);
    }

    public render() {
        return (
            <RadioGroup
                size='small'
                defaultValue={this.props.defaultValue}
                options={this.props.dataTypeOption}
                onChange={this.onDataTypeChange.bind(this)}
            />
        )
    }

    onDataTypeChange(e: any) {
        const value = e.target.value;
        this.props.parent.onDataTypeChange(this.props.UUID, value);
    }
}

export default AttrComponent;