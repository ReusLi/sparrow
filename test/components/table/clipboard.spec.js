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
            expect(false).to.be.equal(true)
        })
    })

    describe('makeMatrix 方法正确构建矩阵的cellModels', () => {
        it ('构建场景1', () => {
            expect(false).to.be.equal(true)
        })
    })
})