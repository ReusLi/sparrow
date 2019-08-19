import * as React from 'react'
import './index.less';

import { Layout } from 'antd'

import { observer } from 'mobx-react'

const { Header, Footer, Sider, Content } = Layout;

// @observer
// export default class PageScroll extends React.Component {
//     public render () {
//         return (
//             <Layout>
//                 <Header>Header</Header>
//                 <Content>{this.props.children}</Content>
//                 <Footer>Footer</Footer>
//             </Layout>
//         )
//     }
// }

export function PageScroll () {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = React.useState(0);

    return (
        <Layout>
            <Header>Header</Header>
            <Content>
                {/* {this.props.children} */}
                <div>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count + 1)}>
                        Click me
                    </button>
                </div>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    );
}