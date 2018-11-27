import * as React from 'react'

import { Table, Icon } from 'antd';

const columns: any = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
    },
    {
        title: 'Other',
        children: [
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 200
            },
            {
                title: 'Address',
                children: [
                    {
                        title: 'Street',
                        dataIndex: 'street',
                        key: 'street',
                        width: 200,
                    },
                    {
                        title: 'Block',
                        children: [
                            {
                                title: 'Building',
                                dataIndex: 'building',
                                key: 'building',
                                width: 100,
                            },
                            {
                                title: 'Door No.',
                                dataIndex: 'number',
                                key: 'number',
                                width: 100,
                            }],
                    }],
            }],
    },
    {
        title: 'Company',
        children: [
            {
                title: 'Company Address',
                dataIndex: 'companyAddress',
                key: 'companyAddress',
            },
            {
                title: 'Company Name',
                dataIndex: 'companyName',
                key: 'companyName',
            }],
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 80,
        fixed: 'right',
    }];

let data: any = [];
for (let i = 0; i < 1; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
    });
}

export default class AntdTable extends React.Component {
    public render() {
        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                size="middle"
                scroll={{ x: '130%', y: 240 }}
            />
        )
    }
}