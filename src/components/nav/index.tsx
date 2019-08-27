import * as React from 'react'
import './index.less';

import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const buildSubMenu = (subItems: any) => {

}

export function Nav () {

    return (
        <Menu mode="horizontal">
            <Menu.Item key="1">
                Navigation 1
            </Menu.Item>
            <Menu.Item key="2">
                Navigation 2
            </Menu.Item>
            <Menu.Item key="3">
                Navigation 3
            </Menu.Item>
            <Menu.Item key="4">
                Navigation 4
            </Menu.Item>
        </Menu>
    )
}