import * as React from 'react'

import { Table, Icon } from 'antd';

const columns: any = [
    {
        title: '列1',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '列2',
        children: [
            {
                title: '列2-1',
                dataIndex: 'companyAddress',
                key: 'companyAddress',
            },
            {
                title: '列2-2',
                dataIndex: 'companyName',
                key: 'companyName',
            }],
    }];


export default class AntdTable extends React.Component {
    public render() {
        return (
            <Table
                columns={columns}
                bordered
            />
        )
    }
}