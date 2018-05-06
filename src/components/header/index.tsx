import * as React from 'react';

import { Layout } from 'antd';
const { Header } = Layout;

import './index.css'

class PageHeader extends React.Component {
    public render() {
        return (
            <Header className='header'>to-do-list-app</Header>
        )
    }
}

export default PageHeader;