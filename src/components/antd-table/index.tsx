import * as React from 'react'

import { Table, Icon } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
        <span>
            <a href="#">Action 一 {record.name}</a>
            <span className="ant-divider" />
            <a href="#">Delete</a>
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link">
                More actions <Icon type="down" />
            </a>
        </span>
    ),
}]

export default class AntdTable extends React.Component {
    public render() {
        return <Table columns={columns} />
    }
}