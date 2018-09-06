import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import Table from 'components/table/table'

Enzyme.configure({ adapter: new Adapter() });

let matrixComponent
try {
    matrixComponent = mount(<Table cellModels={tableConst.tabelProps.cellModels}/>).instance()
} catch (e) {
    console.log(e)
    console.error('渲染matrix组件出错')
}
 
describe('matrix组件', () => {

    describe('测试正确渲染x行y列', () => {
        it('initTableHeader方法', () => {
            let cellList = matrixComponent.buildMatrixMergeCell(matrixModel, mergeCellList)
            expect(1).to.be.ok
        })
    })
})