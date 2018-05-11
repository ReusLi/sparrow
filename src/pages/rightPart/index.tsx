import * as React from 'react'

import MonacoEditor from 'react-monaco-editor'

interface props {
    ref: any
}

interface states {
}

export default class RightPart extends React.Component<props, states> {
    private editor: any;

    public render() {
        return (
            <MonacoEditor
                ref={(editor: any) => this.editor = editor}
                width="800"
                height="600"
                language="javascript"
                theme="vs-dark"
            />
        )
    }

    public format(inputValue: Array<string>) {
        this.editor.editor.setValue(inputValue)
    }
}