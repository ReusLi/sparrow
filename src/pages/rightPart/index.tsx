import * as React from 'react'

// 编辑器插件
// import AceEditor from 'react-ace';

import * as monaco from 'monaco-editor';

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
            <div id="mocano"></div>
        )
    }

    public componentDidMount() {
        monaco.editor.create(document.getElementById('mocano'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        });
    }

    public setColNameValue(colNameStr: string) {
        this.setState({
            value: colNameStr
        })
    }
}