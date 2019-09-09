import * as React from 'react'
import './index.less';

import * as PropTypes from "prop-types";

import { Radio, Checkbox } from 'antd';

Checkbox.Group

interface table {
    shcme: string,
    table: string
}

interface props {
    tableList: Array<table>
}

interface CheckboxOptionType {
    label: string
    value: string | number
}

const buildTemplate = (tableList: Array<table>) => {
    const radioOpt: Array<CheckboxOptionType> = tableList.map(item => {
        return {
            label: item.table,
            value: item.table
        }
    })

    return (
        <Radio.Group options={radioOpt} />
    )
}

export function TableGroup ({ tableList }: PropTypes.InferProps<props>) {
    const radioGp = buildTemplate(tableList)
    return (
        <div>
            {radioGp}
        </div>
    )
}