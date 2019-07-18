import * as React from 'react'

import canvasStore from 'store/canvas'

import { observe } from 'mobx';

import { observer } from 'mobx-react'

@observer
export default class MiniMap extends React.Component {
    public render () {
        return (
            <body id="copyBody">
            </body>
        )
    }

    public componentWillMount () {
        this.observeNode()
    }

    private observeNode () {
        /**
         * 监听nodeInfo
         */
        observe(canvasStore.nodeInfo, (change: any) => {
            // 递归遍历所有带 data-candrop="rect" 的标签
            let dom = change.newValue

            dom = this.findParentDom(dom);

            const newNode: any = dom.cloneNode(true)
            document.querySelector('#copyBody').innerHTML = ''
            document.querySelector('#copyBody').append(newNode)
            return undefined;
        })
    }

    private findParentDom (dom: Element) {
        let i = 0,
            pdom: any = dom.parentNode;

        while (i < 2 && pdom !== null && pdom.tagName !== 'body') {
            const dataCandrop = pdom.getAttribute('data-candrop')
            if (dataCandrop === 'rect') {
                i++;
            }
            pdom = pdom.parentNode;
        }

        return pdom;
    }
}
