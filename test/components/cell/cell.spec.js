import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'

import Cell from 'components/cell/cell'

Enzyme.configure({ adapter: new Adapter() });

// 可能是shallow方法有问题
const cellComponent = shallow(<Cell />).instance()

describe('cell组件', () => {
    let props = {
        startCell: {
            X: 0,
            Y: 0
        },
        endCell: {
            X: 7,
            Y: 7
        },
        cellKey: {
            X: 0,
            Y: 0
        }
    }
    describe('isInSideCell 函数能正确判断cell是否在矩阵内', () => {
        it('it..', () => {
            props.cellKey.X = 8
            props.cellKey.Y = 0

            const result = cellComponent.isInSideCell(props)

            expect(result).to.be.equal(false);
        })
    })
})