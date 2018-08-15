import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import Table from 'components/table/table'

Enzyme.configure({ adapter: new Adapter() });

describe('table组件的功能函数', function () {
    describe('期望buildXY函数, 在4种不同情况时均返回正确', function () {
        const tableComponent = shallow(<Table />).instance()
        
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

        it('期望(0,0),(7,7) 返回正确 (0, 0),(7, 7)', function () {
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

        it('期望(0,7),(7,0) 返回正确 (0, 0),(7, 7)', function () {
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

        it('期望(7,7),(0,0) 返回正确 (0, 0),(7, 7)', function () {
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

        it('期望(7,0),(0,7) 返回正确 (0, 0),(7, 7)', function () {
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
})