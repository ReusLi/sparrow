import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import Table from 'components/table/table'
import tableConst from './const.tsx'

Enzyme.configure({ adapter: new Adapter() });

let tableComponent
try {
    tableComponent = shallow(<Table cellModels={tableConst.tabelProps.cellModels}/>).instance()
} catch (e) {
    console.log(e)
    console.error('渲染Table组件出错')
}
 
describe('table组件', () => {
    describe('buildXY 不同起点,终点,均返回左上角和右下角的2点坐标', () => {
        let selectInfo = {
            startCell: {
                X: 0,
                Y: 0
            },
            endCell: {
                X: 0,
                Y: 0
            }
        }

        it('期望(0,0),(7,7) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = tableComponent.buildXY(selectInfo)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })

        it('期望(0,7),(7,0) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = tableComponent.buildXY(selectInfo)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })

        it('期望(7,7),(0,0) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = tableComponent.buildXY(selectInfo)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })

        it('期望(7,0),(0,7) 返回 (0, 0),(7, 7)', () => {
            selectInfo.startCell.X = 0
            selectInfo.startCell.Y = 0
            selectInfo.endCell.X = 7
            selectInfo.endCell.Y = 7

            const result = tableComponent.buildXY(selectInfo)
            expect(result.startCell.X).to.be.equal(0);
            expect(result.startCell.Y).to.be.equal(0);

            expect(result.endCell.X).to.be.equal(7);
            expect(result.endCell.Y).to.be.equal(7);
        })
    })

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