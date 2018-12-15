import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import App from 'components/matrix/matrix'

Enzyme.configure({ adapter: new Adapter() });

let matrixComponent
try {
    matrixComponent = shallow(<App/>).instance()
} catch (e) {
    console.log(e)
    console.error('渲染matrix组件出错')
}
 
// describe('matrix组件', () => {

//     describe('测试构建n*n矩阵的方法', () => {
//         it('buildMatrixMergeCell方法', () => {
//             let matrixModel = []
//             let mergeCellList = []
//             let cellList = matrixComponent.buildMatrixMergeCell(matrixModel, mergeCellList)
//             console.log(cellList )
//             expect(1).to.be.ok
//         })
//     })
// })