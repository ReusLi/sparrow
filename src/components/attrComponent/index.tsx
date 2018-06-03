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
}

// context
import { AttrContext } from 'context/AttrContext'

class AttrComponent extends React.Component<props, states> {
    constructor(props: props, state: states) {
        super(props);
    }

    public render() {
        return (
            <AttrContext.Consumer>
                {({ onDataTypeChange }) => (
                    <div>
                        <label>{this.props.labelName}：</label>
                        <RadioGroup
                            size='small'
                            defaultValue={this.props.defaultValue}
                            options={this.props.dataTypeOption}
                            onChange={this.onDataTypeChange.bind(this, onDataTypeChange)}
                        />
                    </div>
                )}
            </AttrContext.Consumer>
        )
    }

    /**
     * 
     * @param methodFromContext the method from parent`s context {AttrContext}
     * @param e 
     */
    onDataTypeChange(methodFromContext: Function, e: any) {
        const value = e.target.value;
        methodFromContext(this.props.UUID, value)
    }
}

export default AttrComponent;