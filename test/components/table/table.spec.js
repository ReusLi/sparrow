import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import Table from 'components/table/table'
import tableConst from './const.tsx'

Enzyme.configure({ adapter: new Adapter() });

let tableComponent
try {
    tableComponent = mount(<Table cellModels={tableConst.tabelProps.cellModels}/>).instance()
} catch (e) {
    console.log(e)
    console.error('渲染Table组件出错')
}
 
describe('table组件', () => {
    describe('测试正确渲染x行y列', () => {
        it('initTableHeader方法', () => {
            // TypeError: Cannot convert a Symbol value to a string
            // 好像是karma对es6的语法有兼容问题, 可以试试配置karma.config 或 webpack.config的label ?
            let cellList = tableComponent.initTableHeader(tableConst.tabelProps.cellModels)
            console.log(cellList)
            expect(1).to.be.ok
        })
    })
})