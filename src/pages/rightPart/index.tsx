import * as React from 'react'

// 编辑器插件
// import AceEditor from 'react-ace';

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
    private editor: any;

    constructor(props: props, state: states) {
        super(props);
        this.state = {
            value: ''
        };
    }

    public render() {

        return (
            // <AceEditor
            //     mode="javascript"
            //     theme="github"
            //     name="UNIQUE_ID_OF_DIV"
            //     value={this.state.value}
            //     editorProps={{ $blockScrolling: true }}
            // />
            <MonacoEditor
                width="800"
                height="600"
                language="javascript"
                value="// type your code..."
            />
            // <div id="mocano"></div>
        )
    }

    public componentDidMount() {

    }

    public setColNameValue(colNameStr: string) {
        this.setState({
            value: colNameStr
        })
    }
}