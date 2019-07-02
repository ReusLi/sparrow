import * as React from 'react'

import canvasStore from 'store/canvas'

import { observer } from 'mobx-react'


import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

@observer
export default class CanvasPanel extends React.Component {
    public render () {
        return (
            // <Layout className="layout" onMouseDown={this.onmousedown.bind(this)}>
            //     <Header>
            //         <div className="logo" />
            //         <Menu
            //             theme="dark"
            //             mode="horizontal"
            //             defaultSelectedKeys={['1']}
            //             style={{ lineHeight: '64px' }}
            //         >
            //             <Menu.Item key="1">nav 1</Menu.Item>
            //             <Menu.Item key="2">nav 2</Menu.Item>
            //             <Menu.Item key="3">nav 3</Menu.Item>
            //         </Menu>
            //     </Header>
            //     <Content style={{ padding: '0 50px' }}>
            //         <Breadcrumb style={{ margin: '16px 0' }}>
            //             <Breadcrumb.Item>Home</Breadcrumb.Item>
            //             <Breadcrumb.Item>List</Breadcrumb.Item>
            //             <Breadcrumb.Item>App</Breadcrumb.Item>
            //         </Breadcrumb>
            //         <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
            //     </Content>
            //     <Footer style={{ textAlign: 'center' }}>Test For Mini-Map</Footer>
            // </Layout>
            
            <div data-candrop="rect" className="ant-col-12" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div data-candrop="rect" className="layout ant-layout">
                    <div data-candrop="rect" className="ant-layout-header">
                        <div className="logo">
                        </div>
                        <ul className="ant-menu ant-menu-dark ant-menu-root ant-menu-horizontal" style={{ lineHeight: '64px' }}>
                            <li className="ant-menu-item" role="menuitem" aria-selected="false">
                                nav 1
                            </li>
                            <li className="ant-menu-item ant-menu-item-selected" role="menuitem" aria-selected="true">nav 2</li>
                            <li className="ant-menu-item" role="menuitem" aria-selected="false">nav 3</li>
                        </ul>
                    </div>
                    <div data-candrop="rect" className="ant-layout-content" style={{ padding: '0px 50px' }}>
                        <div className="ant-breadcrumb" style={{ margin: '16px 0px' }}>
                            <span>
                                <span className="ant-breadcrumb-link">Home</span>
                                <span className="ant-breadcrumb-separator">/</span>
                            </span>
                            <span>
                                <span className="ant-breadcrumb-link">List</span>
                                <span className="ant-breadcrumb-separator">/</span>
                            </span>
                            <span>
                                <span className="ant-breadcrumb-link">App</span>
                                <span className="ant-breadcrumb-separator">/</span>
                            </span>
                        </div>
                        <div data-candrop="rect" style={{ background: 'rgb(255, 255, 255)', padding: '24px', minHeight: '280px' }}>Content</div>
                    </div>
                    <div className="ant-layout-footer" style={{ textAlign: 'center' }}>
                        Test For Mini-Map
                    </div>
                </div>
            </div>
        )
    }

    private onmousedown (e: MouseEvent) {
        console.log(e.target)
    }
}