import * as React from 'react';

import { Layout } from 'antd';
const { Header } = Layout;

import './index.css'

class PageHeader extends React.Component {
    public render() {
        return (
            <Header className='header'>template-builder</Header>
        )
    }
}

export default PageHeader;