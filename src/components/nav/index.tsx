import * as React from 'react'
import './index.less';

import { Menu, Icon } from 'antd';
import * as PropTypes from "prop-types";

const buildSubMenu = (subMenu: Array<subMenu>) => {
    return subMenu.map(menu => {
        return (
            <Menu.Item key={menu.id}>
                {menu.text}
            </Menu.Item>
        )
    })
}

export function Nav ({ subMenu }: PropTypes.InferProps<navProps>) {
    console.log(subMenu)

    const SubMenu = buildSubMenu(subMenu)

    return (
        <Menu mode="horizontal">
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