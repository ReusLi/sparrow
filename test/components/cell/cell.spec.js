import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'


import Cell from 'components/cell/cell'
Enzyme.configure({ adapter: new Adapter() });


let CellProps = {
    // cell text
    text: '',

    // 单元格key
    cellKey: {
        X: 0,
        Y: 0
    },

    // 是否可编辑
    isEditable: false,

    // 父组件选择的区域信息
    selectInfo: {
        startCell: {
            X: 0,
            Y: 0
        },
        endCell: {
            X: 0,
            Y: 0
        }
    },

    mouseDownEvent: function () { },

    mouseUpEvent: function () { },

    mouseOverEvent: function () { }
}

let cellComponent

// 可能是shallow方法有问题
try {
    cellComponent = shallow(<Cell {...CellProps}/>).instance()
} catch (e) {
    console.log(e)
}

describe('cell组件', () => {
    let props = {
        selectInfo: {
            startCell: {
                X: 0,
                Y: 0
            },
            endCell: {
                X: 7,
                Y: 7
            }
        },
        cellKey: {
            X: 0,
            Y: 0
        }
    }

    describe('isInSideCell 判断cell是否在矩阵内', () => {
        it('在矩阵内的情况', () => {
            props.cellKey.X = 4
            props.cellKey.Y = 4

            const result = cellComponent.isInSideCell(props)

            expect(result).to.be.equal(true);
        })

        it('不在矩阵内的情况', () => {
            props.cellKey.X = 9
            props.cellKey.Y = 9

            const result = cellComponent.isInSideCell(props)

            expect(result).to.be.equal(false);
        })
    })

    describe('判断cell是否处于边界', () => {

        it('isTop边界', () => {
            props.cellKey.X = 0

            let className = cellComponent.isTop([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-top');
        })

        it('isRight边界', () => {
            props.cellKey.Y = 7

            let className = cellComponent.isRight([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-right');
        })

        it('isBottm边界', () => {
            props.cellKey.X = 7

            let className = cellComponent.isBottm([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-bottom');
        })

        it('isLeft边界', () => {
            props.cellKey.Y = 0

            let className = cellComponent.isLeft([''], props)

            className = className[1]

            expect(className).to.be.equal('custom-focus-left');
        })

    })
})