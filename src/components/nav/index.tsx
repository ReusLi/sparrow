import * as React from 'react'
import './index.less';

import { Layout, Menu, Row } from 'antd';

import * as PropTypes from "prop-types";

const { Header, Footer, Sider, Content } = Layout;

const buildSubMenu = function (subMenu: Array<subMenu>) {
    return subMenu.map(menu => {
        return (
            <Menu.Item key={menu.id}>
                {menu.text}
            </Menu.Item>
        )
    })
}


var logosrc = require('../../asstes/images/logo.png');

export function Nav ({ subMenu }: PropTypes.InferProps<navProps>) {
    const SubMenu = buildSubMenu(subMenu)

    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setMenu] = React.useState(0);

    React.useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    const handleClick = () => {
        setMenu(count + 1)
    }

    return (
        <Header className="spr-nav">
            <Row className="content"type="flex" align="middle">
                <img src={logosrc} className=""/>
                <Menu className="spr-menu" mode="horizontal" onClick={handleClick}>
                    {SubMenu}
                </Menu>
            </Row>
        </Header>
    )
}

interface subMenu {
    id: number,
    text: string
}

interface navProps {
    subMenu: Array<subMenu>
};