import * as React from 'react'
import './index.less';

import { Menu, Icon, Alert } from 'antd';
import * as PropTypes from "prop-types";


const buildSubMenu = function (subMenu: Array<subMenu>) {
    return subMenu.map(menu => {
        return (
            <Menu.Item key={menu.id}>
                {menu.text}
            </Menu.Item>
        )
    })
}

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
        <Menu mode="horizontal" onClick={handleClick}>
            {SubMenu}
        </Menu>
    )
}

interface subMenu {
    id: number,
    text: string
}

interface navProps {
    subMenu: Array<subMenu>
};