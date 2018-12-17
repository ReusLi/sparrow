import { expect } from 'chai'

import clipboard from 'components/table/clipboard'

const CONST = {
    RESULT_LEN: 2,
    ITEM_LEN: 3
}

describe('clipboard 剪切板工具类', () => {
    describe('filterPasteData 方法正确过滤出n*n矩阵', () => {
        it('paste场景1', () => {
            const paste1 = [
                ['1', '2', '3'],
                ['4', '5', '6']
            ]

            const result = clipboard.filterPasteData(paste1)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景2', () => {
            const paste2 = [
                ['1', '2', '3', ''],
                ['4', '5', '6']
            ]

            const result = clipboard.filterPasteData(paste2)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景3', () => {
            const paste3 = [
                ['1', '2', '3'],
                ['4', '5', '6', '']
            ]

            const result = clipboard.filterPasteData(paste3)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景4', () => {
            const paste4 = [
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['']
            ]

            const result = clipboard.filterPasteData(paste4)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景5', () => {
            const paste5 = [
                ['1', '2', '3', ''],
                ['4', '5', '6'],
                ['']
            ]

            const result = clipboard.filterPasteData(paste5)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景6', () => {
            const paste6 = [
                ['1', '2', '3'],
                ['4', '5', '6', ''],
                ['']
            ]

            const result = clipboard.filterPasteData(paste6)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })

        it('paste场景7', () => {
            const paste7 = [
                ['1', '2', '3', ''],
                ['4', '5', '6', ''],
                ['']
            ]

            const result = clipboard.filterPasteData(paste7)

            const isSameLen = result.every(item => item.length === CONST.ITEM_LEN)

            expect(isSameLen).to.be.equal(true)

            expect(result.length).to.be.equal(CONST.RESULT_LEN)
        })
    })

    describe('getPasteData 方法正确拿到剪切板的值', () => {
        it ('paste数据结构1', () => {
            const pasteStr1 = 
                  `1	2	3
                        4	5`

            /**
             * result应该等于:
             *  [
             *      ['1', '2', '3']
             *      ['', '4', '5']
             *  ]
             */
            const result = clipboard.getPasteData(pasteStr1)

            expect(result.length).to.be.equal(2)

            expect(result[0][0]).to.be.equal('1')
            expect(result[0][1]).to.be.equal('2')
            expect(result[0][2]).to.be.equal('3')

            expect(result[1][0]).to.be.equal('')
            expect(result[1][1]).to.be.equal('4')
            expect(result[1][2]).to.be.equal('5')
        })
    })

    describe('makeMatrix 方法正确构建矩阵的cellModels', () => {
        const checkAttr = (cell) => {
            return cell.X !== undefined
                && cell.Y !== undefined
                && cell.colSpan !== undefined
                && cell.rowSpan !== undefined
                && cell.text !== undefined
                && cell.isHide !== undefined
        }

        it ('构建场景1', () => {
            const pasteData1 = [
                ['1', '2'],
                ['3', '4']
            ]

            const result = clipboard.makeMatrix(pasteData1)

            // 检查属性是否齐全
            expect(checkAttr(result[0][0])).to.be.equal(true)
            expect(checkAttr(result[0][1])).to.be.equal(true)
            expect(checkAttr(result[1][0])).to.be.equal(true)
            expect(checkAttr(result[1][1])).to.be.equal(true)

            // 检查建构后是不是还是 2*2的矩阵
            expect(result.length).to.be.equal(2)
            expect(result[0].length).to.be.equal(2)
            expect(result[1].length).to.be.equal(2)
        })

        it ('构建场景2', () => {
            const pasteData2 = [
                ['', '2'],
                ['3', '']
            ]

            const result = clipboard.makeMatrix(pasteData2)

            // 检查属性是否齐全
            expect(checkAttr(result[0][0])).to.be.equal(true)
            expect(checkAttr(result[0][1])).to.be.equal(true)
            expect(checkAttr(result[1][0])).to.be.equal(true)
            expect(checkAttr(result[1][1])).to.be.equal(true)

            // 检查isHide属性有没有正确设置
            expect(result[0][0].isHide).to.be.equal(true)
            expect(result[0][1].isHide).to.be.equal(false)
            expect(result[1][0].isHide).to.be.equal(false)
            expect(result[1][1].isHide).to.be.equal(true)

            // 检查建构后是不是还是 2*2的矩阵
            expect(result.length).to.be.equal(2)
            expect(result[0].length).to.be.equal(2)
            expect(result[1].length).to.be.equal(2)
        })
    })

    describe('resetSpan方法, 根据paste的""值, 正确设置colSpan, rowSpan', () => {
        it ('resetSpan场景1', () => {
            expect(false).to.be.equal(true)
        })
    })

    describe('setColSpan 找到左侧距离最近的isHide = false的cell, 并使cell.colSpan + 1', () => {
        it ('场景1', () => {
            expect(false).to.be.equal(true)
        })
    })

    describe('setRowSpan 找到上方距离最近的isHide = false的cell, 并使cell.rowSpan + 1', () => {
        it ('场景1', () => {
            expect(false).to.be.equal(true)
        })
    })
})