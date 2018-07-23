import * as React from 'react'

// 编辑器插件
import MonacoEditor from 'react-monaco-editor'

interface props {
    /** 引用          */
    ref: any
}

interface states {
    /** editor的值 */
    value: string
}

export default class RightPart extends React.Component<props, states> {

    constructor(props: props, state: states) {
        super(props);
        this.state = {
            value: ''
        };
    }

    public render() {

        return (
            <MonacoEditor
                width="800"
                height="600"
                language="java"
                onChange={this.onChange.bind(this)}
                value={this.state.value}
            />
        )
    }

    public componentDidMount() {

    }

    private onChange(newValue: string, e: any) {
        this.setState({
            value: newValue
        })
    }

    public setColNameValue(colNameStr: string) {
        this.setState({
            value: colNameStr
        })
    }

    public getEditorValue() {
        return this.state.value;
    }
}